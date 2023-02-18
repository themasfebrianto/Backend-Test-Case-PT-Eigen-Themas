import * as lessonService from '../services/services.js';
import { asyncHandler, sendNotFound, sendResponse } from '../../../../helpers/helpers.js';

export const getLessons = asyncHandler(async (req, res) => {
    const lessons = await lessonService.getAllLessons();
    sendResponse(res, lessons);
});

export const getLessonById = asyncHandler(async (req, res) => {
    const lesson = await lessonService.getLessonById(req.params.id);
    lesson ? sendResponse(res, lesson) : sendNotFound(res, 'Lesson not found');
});

export const createLesson = asyncHandler(async (req, res) => {
    const insertedLesson = await lessonService.createLesson(req.body);
    sendResponse(res.status(201), insertedLesson);
});

export const updateLesson = asyncHandler(async (req, res) => {
    const updatedLesson = await lessonService.updateLesson(req.params.id, req.body);
    updatedLesson ? sendResponse(res, updatedLesson) : sendNotFound(res, 'Lesson not found');
});

export const deleteLesson = asyncHandler(async (req, res) => {
    const deletedRows = await lessonService.deleteLesson(req.params.id);
    deletedRows ? res.status(204).end() : sendNotFound(res, 'Lesson not found');
});