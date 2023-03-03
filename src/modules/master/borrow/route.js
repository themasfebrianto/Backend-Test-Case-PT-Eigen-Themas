// modules/borrow/routes.js
import express from 'express';
import { borrowBook, returnBook } from './controllers/controller.js';

const router = express.Router();

router.post('/', borrowBook);
router.post('/return', returnBook);

export default router;
