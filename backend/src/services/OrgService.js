import OrganizationRepository from '../repositories/OrganizationRepository.js';
import UserRepository from '../repositories/UserRepository.js';
import { ApiError } from '../utils/ApiError.js';

class OrgService {
  async createOrganization(data, adminId) {
    // Check if a user already exists with this email
    let user = await UserRepository.findOne({ email: data.email });
    
    if (!user) {
      // Create a new user for this organization
      user = await UserRepository.create({
        name: data.name,
        email: data.email,
        password: 'ChangeMe123!', // Default password for new organizations
        role: 'organization',
        phone: data.phone,
        address: data.address,
      });
    } else if (user.role !== 'organization' && user.role !== 'admin') {
      // If user exists but is a donor/volunteer, maybe we shouldn't force it?
      // For now, let's assume if it exists, we use it, but update role if needed?
      // Actually, better to throw error if it's a different role to avoid confusion.
      throw new ApiError(400, 'A user with this email already exists with a different role.');
    }

    return await OrganizationRepository.create({ ...data, ownerId: user._id });
  }

  async getOrganization(id) {
    // Try to find by Organization ID first, then by ownerId
    let org = await OrganizationRepository.findById(id, 'ownerId volunteers');
    if (!org) {
      org = await OrganizationRepository.findOne({ ownerId: id }, 'ownerId volunteers');
    }

    if (!org) throw new ApiError(404, 'Organization not found');
    return org;
  }

  async getAllOrganizations() {
    return await OrganizationRepository.find({}, { populate: 'ownerId' });
  }

  async updateOrganization(id, data) {
    let org = await OrganizationRepository.findById(id);
    if (!org) {
      org = await OrganizationRepository.findOne({ ownerId: id });
    }

    if (!org) throw new ApiError(404, 'Organization not found');

    return await OrganizationRepository.update(org._id, data);
  }

  async addVolunteer(organizationId, volunteerIdOrEmail) {
    const org = await OrganizationRepository.findById(organizationId);
    if (!org) throw new ApiError(404, 'Organization not found');

    let volunteer;
    if (volunteerIdOrEmail.includes('@')) {
      volunteer = await UserRepository.findOne({ email: volunteerIdOrEmail, role: 'volunteer' });
    } else {
      volunteer = await UserRepository.findById(volunteerIdOrEmail);
    }

    if (!volunteer || volunteer.role !== 'volunteer') {
      throw new ApiError(404, 'Volunteer not found');
    }

    if (org.volunteers.includes(volunteer._id)) {
      throw new ApiError(400, 'Volunteer already in network');
    }

    org.volunteers.push(volunteer._id);
    await org.save();
    return org;
  }

  async getAvailableVolunteers() {
    return await UserRepository.find({ role: 'volunteer' });
  }
}

export default new OrgService();
