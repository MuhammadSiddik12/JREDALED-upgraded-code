import { Router } from 'express';
import { getDashboardStats, getDashboardMap } from '../controllers/dashboardController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

router.get('/stats', authenticate, getDashboardStats);
router.get('/map', authenticate, getDashboardMap);

export default router;
