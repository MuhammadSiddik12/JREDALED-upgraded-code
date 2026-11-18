import { Router } from 'express';
import authRoutes from './authRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import geoRoutes from './geoRoutes.js';
import distributorRoutes from './distributorRoutes.js';
import customerRoutes from './customerRoutes.js';
import organizationRoutes from './organizationRoutes.js';
import inventoryRoutes from './inventoryRoutes.js';
import rmsRoutes from './rmsRoutes.js';
import calibrationRoutes from './calibrationRoutes.js';
import userRoutes from './userRoutes.js';
import reportRoutes from './reportRoutes.js';
import iotRoutes from './iotRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/geo', geoRoutes);
router.use('/distributors', distributorRoutes);
router.use('/customers', customerRoutes);
router.use('/organizations', organizationRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/rms', rmsRoutes);
router.use('/calibration', calibrationRoutes);
router.use('/users', userRoutes);
router.use('/reports', reportRoutes);
router.use('/iot', iotRoutes);

// Hardware root aliases for k.php & Cmd.php
router.use('/', iotRoutes);

export default router;
