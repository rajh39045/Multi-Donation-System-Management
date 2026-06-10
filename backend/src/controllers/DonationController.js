import DonationService from '../services/DonationService.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class DonationController {
  createDonation = asyncWrapper(async (req, res) => {
    const donation = await DonationService.createDonation(req.body, req.user._id);
    res.status(201).json(new ApiResponse(201, donation, 'Donation created successfully'));
  });

  getAllDonations = asyncWrapper(async (req, res) => {
    const donations = await DonationService.getAllDonations();
    res.status(200).json(new ApiResponse(200, donations));
  });

  getMyDonations = asyncWrapper(async (req, res) => {
    const donations = await DonationService.getMyDonations(req.user._id, req.user.role);
    res.status(200).json(new ApiResponse(200, donations));
  });

  assignVolunteer = asyncWrapper(async (req, res) => {
    const { donationId, volunteerId } = req.body;
    const donation = await DonationService.assignVolunteer(donationId, volunteerId);
    res.status(200).json(new ApiResponse(200, donation, 'Volunteer assigned successfully'));
  });

  updateStatus = asyncWrapper(async (req, res) => {
    const { status } = req.body;
    const donation = await DonationService.updateStatus(req.params.id, status, req.user._id, req.user.role);
    res.status(200).json(new ApiResponse(200, donation, 'Status updated successfully'));
  });
}

export default new DonationController();
