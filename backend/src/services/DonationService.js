import DonationRepository from '../repositories/DonationRepository.js';
import UserRepository from '../repositories/UserRepository.js';
import OrganizationRepository from '../repositories/OrganizationRepository.js';
import CreditRepository from '../repositories/CreditRepository.js';
import { ApiError } from '../utils/ApiError.js';

class DonationService {
  async createDonation(data, donorId) {
    return await DonationRepository.create({ ...data, donorId });
  }

  async getAllDonations() {
    return await DonationRepository.find({}, { populate: 'donorId organizationId volunteerId' });
  }

  async getMyDonations(userId, role) {
    let query;

    if (role === 'donor') {
      query = { donorId: userId };
    } else if (role === 'volunteer') {
      query = { volunteerId: userId };
    } else if (role === 'organization') {
      const org = await OrganizationRepository.findOne({ ownerId: userId });
      if (!org) {
        return await DonationRepository.find({ _id: null }, { populate: 'donorId organizationId volunteerId' });
      }
      query = { organizationId: org._id };
    } else if (role === 'admin') {
      query = {};
    } else {
      query = { _id: null };
    }

    return await DonationRepository.find(query, { populate: 'donorId organizationId volunteerId' });
  }

  async assignVolunteer(donationId, volunteerId) {
    const donation = await DonationRepository.findById(donationId);
    if (!donation) throw new ApiError(404, 'Donation not found');
    if (donation.status !== 'pending') {
      throw new ApiError(400, 'Donation is already assigned or in progress');
    }

    const volunteer = await UserRepository.findById(volunteerId);
    if (!volunteer || volunteer.role !== 'volunteer') {
      throw new ApiError(404, 'Volunteer not found');
    }

    donation.volunteerId = volunteerId;
    donation.status = 'assigned';
    await donation.save();

    return await DonationRepository.findById(donationId, 'donorId organizationId volunteerId');
  }

  async updateStatus(donationId, status, userId, userRole) {
    const donation = await DonationRepository.findById(donationId);
    if (!donation) throw new ApiError(404, 'Donation not found');

    if (userRole === 'volunteer' && donation.volunteerId?.toString() !== userId.toString()) {
      throw new ApiError(403, 'Not authorized to update this donation status');
    }

    donation.status = status;

    if (status === 'delivered') {
      const donor = await UserRepository.findById(donation.donorId);
      if (donor) {
        const creditAmount = 10;
        donor.credits += creditAmount;
        await donor.save();

        await CreditRepository.create({
          userId: donor._id,
          amount: creditAmount,
          reason: `Donation delivered: ${donation.itemType}`,
        });

        donation.creditsAwarded = creditAmount;
      }
    }

    await donation.save();
    return await DonationRepository.findById(donationId, 'donorId organizationId volunteerId');
  }
}

export default new DonationService();
