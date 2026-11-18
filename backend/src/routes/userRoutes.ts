import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserAccessLevels,
  updateUserAccessLevels,
  getUserLoginHistory,
} from '../controllers/userController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', getUsers);
router.get('/login-history', getUserLoginHistory);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/access', getUserAccessLevels);
router.post('/:id/access', updateUserAccessLevels);

export default router;
