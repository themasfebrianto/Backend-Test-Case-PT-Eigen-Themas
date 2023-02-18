import * as services from '../services/services.js';
import { asyncHandler, sendNotFound, sendResponse, getResultOrNotFound } from '../../../../helpers/helpers.js';

export const getCourses = asyncHandler(async (req, res) => {
    const courses = await services.getAllCourses();
    sendResponse(res, courses);
});

export const getCourseById = asyncHandler(async (req, res) => {
    const course = await services.getCourseById(req.params.id);
    sendResponse(res, getResultOrNotFound(course, 'Course not found'));
});

export const createCourse = asyncHandler(async (req, res) => {
    const insertedCourse = await services.createCourse(req.body);
    sendResponse(res.status(201), insertedCourse);
});

export const updateCourse = asyncHandler(async (req, res) => {
    const updatedCourse = await services.updateCourse(req.params.id, req.body);
    sendResponse(res, getResultOrNotFound(updatedCourse, 'Course not found'));
});

export const deleteCourse = asyncHandler(async (req, res) => {
    const numRows = await services.deleteCourse(req.params.id);
    numRows > 0 ? res.status(204).end() : sendNotFound(res, 'Course not found');
});