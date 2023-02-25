import express from 'express';
import { getLessonContentsById } from './controllers/controller.js';

const router = express.Router();

router.get('/:id', getLessonContentsById);


export default router;