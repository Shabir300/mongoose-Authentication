import express from 'express';
import { getMe, getUsers, loginUser, registerUser } from '../controllers/userControllers.js';
import protect from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/getme', protect, getMe);
router.get('/', protect, getUsers);

export default router;