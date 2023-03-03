// modules/lessonsGroups/routes.js
import express from 'express';
import {
    getAllLessonsGroups,
    getLessonsGroupById,
    createLessonsGroup,
    updateLessonsGroup,
    deleteLessonsGroup
} from './controllers/controller.js';

const router = express.Router();

router.get('/', getAllLessonsGroups);
router.get('/:id', getLessonsGroupById);
router.post('/', createLessonsGroup);
router.put('/:id', updateLessonsGroup);
router.delete('/:id', deleteLessonsGroup);

export default router;