import express from 'express';
import DonationController from '../controllers/DonationController.js';
import validate from '../middlewares/validate.js';
import { createDonationSchema, updateStatusSchema } from '../validators/donationValidator.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', authorize('donor'), validate(createDonationSchema), DonationController.createDonation);
router.get('/', authorize('organization', 'admin', 'volunteer'), DonationController.getAllDonations);
router.get('/my-donations', DonationController.getMyDonations);
router.post('/assign-volunteer', authorize('organization', 'admin'), DonationController.assignVolunteer);
router.put('/:id/status', authorize('volunteer', 'admin', 'organization'), validate(updateStatusSchema), DonationController.updateStatus);

export default router;
