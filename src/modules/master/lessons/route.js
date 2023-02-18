import express from 'express';
import {
    getLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson
} from './controllers/controller.js';

const router = express.Router();

router.get('/', getLessons);
router.get('/:id', getLessonById);
router.post('/', createLesson);
router.put('/:id', updateLesson);
router.delete('/:id', deleteLesson);

export default router;