import express from 'express';
import {
    getAllLessonContents,
    getLessonContentById,
    createLessonContent,
    updateLessonContent,
    deleteLessonContent
} from './controllers/controller.js';

const router = express.Router();

router.get('/', getAllLessonContents);
router.get('/:id', getLessonContentById);
router.post('/', createLessonContent);
router.put('/:id', updateLessonContent);
router.delete('/:id', deleteLessonContent);

export default router;