import * as courseService from '../services/services.js';
import { handleAsync } from '../../../../helpers/helpers.js';

export const getCourses = handleAsync(async (req, res) => {
    const courses = await courseService.getAllCourses();
    return courses;
});

export const getCourseById = handleAsync(async (req, res) => {
    const course = await courseService.getCourseById(req.params.id);
    return course;
});

export const createCourse = handleAsync(async (req, res) => {
    const insertedCourse = await courseService.createCourse(req.body);
    return insertedCourse;
});

export const updateCourse = handleAsync(async (req, res) => {
    const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
    return updatedCourse;
});

export const deleteCourse = handleAsync(async (req, res) => {
    const numRows = await courseService.deleteCourse(req.params.id);
    return numRows;
});