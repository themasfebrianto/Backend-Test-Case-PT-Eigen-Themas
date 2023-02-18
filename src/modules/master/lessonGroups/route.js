// modules/course/routes.js
import express from 'express';
import { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } from '../courses/controllers/controller.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;