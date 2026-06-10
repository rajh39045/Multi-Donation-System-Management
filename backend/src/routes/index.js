import express from 'express';
import authRoutes from './authRoutes.js';
import orgRoutes from './orgRoutes.js';
import donationRoutes from './donationRoutes.js';
import creditRoutes from './creditRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/organizations', orgRoutes);
router.use('/donations', donationRoutes);
router.use('/credits', creditRoutes);

export default router;
