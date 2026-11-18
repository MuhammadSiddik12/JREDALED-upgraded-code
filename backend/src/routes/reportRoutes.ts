import { Router } from 'express';
import {
  getCustomReport,
  getOnOffReport,
  getFaultReport,
  getLatestLogs,
  getLogs,
  getSIMStatus,
  getQRData,
  getLPMCalculation,
} from '../controllers/reportController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

router.use(authenticate);

router.get('/custom', getCustomReport);
router.get('/on-off', getOnOffReport);
router.get('/faults', getFaultReport);
router.get('/latest-logs', getLatestLogs);
router.get('/logs', getLogs);
router.get('/recent-logs', getLatestLogs);
router.get('/sim-status', getSIMStatus);
router.get('/qr-data', getQRData);
router.get('/lpm', getLPMCalculation);

export default router;
