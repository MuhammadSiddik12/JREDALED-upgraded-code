import { Router } from 'express';
import {
  getRMSList,
  getRMSById,
  createRMS,
  updateRMS,
  deleteRMS,
  blockRMS,
  resetRMSTime,
  resetAllCloudDelay,
  calibrateRMSAction,
} from '../controllers/rmsController.js';
import { setPumpCommand, setDataPush } from '../controllers/pumpController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', getRMSList);
router.get('/:id', getRMSById);
router.post('/', createRMS);
router.put('/:id', updateRMS);
router.delete('/:id', deleteRMS);

// Remote control & Actions matching PHP
router.post('/block', blockRMS);
router.post('/reset-time', resetRMSTime);
router.post('/reset-cloud-delay', resetAllCloudDelay);
router.post('/calibrate-action', calibrateRMSAction);
router.post('/pump-command', setPumpCommand);
router.post('/data-push', setDataPush);

export default router;
