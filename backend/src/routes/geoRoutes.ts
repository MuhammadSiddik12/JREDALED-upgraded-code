import { Router } from 'express';
import { getDistricts, getBlocks, getPanchayats, getWards, getLights } from '../controllers/geoController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

router.get('/districts', authenticate, getDistricts);
router.get('/blocks', authenticate, getBlocks);
router.get('/panchayats', authenticate, getPanchayats);
router.get('/wards', authenticate, getWards);
router.get('/lights', authenticate, getLights);

export default router;
