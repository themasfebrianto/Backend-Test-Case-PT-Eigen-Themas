// routes/userRoutes.js
import express from 'express';
import { loginUser, registerUser, changePassword, deleteUser } from './controllers/controller.js';

const router = express.Router();

// POST /login
router.post('/login', loginUser);

// POST /register
router.post('/register', registerUser);

// PUT /change-password
router.put('/change-password', changePassword);

// DELETE /delete-account
router.delete('/delete-account', deleteUser);

export default router;