import OrgService from '../services/OrgService.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class OrgController {
  createOrg = asyncWrapper(async (req, res) => {
    const org = await OrgService.createOrganization(req.body, req.user._id);
    res.status(201).json(new ApiResponse(201, org, 'Organization created successfully'));
  });

  getOrg = asyncWrapper(async (req, res) => {
    const org = await OrgService.getOrganization(req.params.id);
    res.status(200).json(new ApiResponse(200, org));
  });

  getAllOrgs = asyncWrapper(async (req, res) => {
    const orgs = await OrgService.getAllOrganizations();
    res.status(200).json(new ApiResponse(200, orgs));
  });

  updateOrg = asyncWrapper(async (req, res) => {
    const org = await OrgService.updateOrganization(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, org, 'Organization updated successfully'));
  });

  addVolunteer = asyncWrapper(async (req, res) => {
    const { organizationId, volunteerId } = req.body;
    const org = await OrgService.addVolunteer(organizationId, volunteerId);
    res.status(200).json(new ApiResponse(200, org, 'Volunteer added successfully'));
  });

  getAvailableVolunteers = asyncWrapper(async (req, res) => {
    const volunteers = await OrgService.getAvailableVolunteers();
    res.status(200).json(new ApiResponse(200, volunteers));
  });
}

export default new OrgController();
