import express from 'express';
import { getMe, getUsers, loginUser, registerUser } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/getme', getMe);
router.get('/', getUsers);

export default router;