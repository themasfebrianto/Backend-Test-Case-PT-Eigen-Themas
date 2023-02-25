import express from 'express';
import { getLessonsGroupsMenu } from './controllers/controller.js';

const router = express.Router();

router.get('/:lessonsGroups', getLessonsGroupsMenu);

export default router;