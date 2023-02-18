import * as courseService from '../services/services.js';
import { asyncHandler, sendNotFound, sendResponse } from '../../../../helpers/helpers.js';

export const getCourses = asyncHandler(async (req, res) => {
    const courses = await courseService.getAllCourses();
    sendResponse(res, courses);
});

export const getCourseById = asyncHandler(async (req, res) => {
    const course = await courseService.getCourseById(req.params.id);
    course ? sendResponse(res, course) : sendNotFound(res, 'Course not found');
});

export const createCourse = asyncHandler(async (req, res) => {
    const insertedCourse = await courseService.createCourse(req.body);
    sendResponse(res.status(201), insertedCourse);
});

export const updateCourse = asyncHandler(async (req, res) => {
    const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
    updatedCourse ? sendResponse(res, updatedCourse) : sendNotFound(res, 'Course not found');
});

export const deleteCourse = asyncHandler(async (req, res) => {
    const numRows = await courseService.deleteCourse(req.params.id);
    numRows ? res.status(204).end() : sendNotFound(res, 'Course not found');
});