import express from 'express';
import CreditController from '../controllers/CreditController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', CreditController.getCredits);
router.get('/history', CreditController.getCreditHistory);
router.get('/rewards', CreditController.getRewards);
router.post('/rewards/:rewardId/claim', CreditController.claimReward);

export default router;
