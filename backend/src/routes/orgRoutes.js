import express from 'express';
import OrgController from '../controllers/OrgController.js';
import validate from '../middlewares/validate.js';
import { createOrgSchema, updateOrgSchema } from '../validators/orgValidator.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', authorize('organization', 'admin'), validate(createOrgSchema), OrgController.createOrg);
router.get('/all', OrgController.getAllOrgs);
router.get('/available-volunteers', authorize('organization', 'admin'), OrgController.getAvailableVolunteers);
router.get('/:id', OrgController.getOrg);
router.put('/:id', authorize('organization', 'admin'), validate(updateOrgSchema), OrgController.updateOrg);
router.post('/add-volunteer', authorize('organization', 'admin'), OrgController.addVolunteer);

export default router;
