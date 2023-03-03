// modules/borrow/routes.js
import express from 'express';
import { borrowBook } from './controllers/controller.js';

const router = express.Router();

router.post('/', borrowBook);

export default router;
