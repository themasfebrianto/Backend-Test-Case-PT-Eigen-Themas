// routes.js
import express from 'express';
import courseRoutes from './modules/master/courses/route.js';
import lessonsGroup from './modules/master/lessonsGroups/route.js';
import lessons from './modules/master/lessons/route.js';
import lessonsContents from './modules/master/lessonsContents/route.js';


const router = express.Router();

router.use('/courses', courseRoutes);
router.use('/groups', lessonsGroup);
router.use('/lessons', lessons);
router.use('/contents', lessonsContents);

export default router;