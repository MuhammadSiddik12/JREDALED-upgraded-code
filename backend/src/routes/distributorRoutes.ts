import { Router } from 'express';
import {
  getDistributors,
  getDistributorById,
  createDistributor,
  updateDistributor,
  deleteDistributor,
  allocateDistributor,
} from '../controllers/distributorController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', getDistributors);
router.get('/:id', getDistributorById);
router.post('/', createDistributor);
router.put('/:id', updateDistributor);
router.delete('/:id', deleteDistributor);
router.post('/allocate', allocateDistributor);

export default router;
