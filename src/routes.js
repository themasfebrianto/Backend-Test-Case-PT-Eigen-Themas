// routes.js
import express from 'express';
import courseRoutes from './modules/master/courses/route.js';


const router = express.Router();

router.use('/courses', courseRoutes);

export default router;