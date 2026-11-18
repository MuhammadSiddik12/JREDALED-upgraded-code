import { Router } from 'express';
import { getCalibration, updateCalibration } from '../controllers/calibrationController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', getCalibration);
router.post('/', updateCalibration);

export default router;
