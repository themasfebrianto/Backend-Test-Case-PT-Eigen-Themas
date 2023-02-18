import * as lessonContentService from '../services/services.js';
import { asyncHandler, sendNotFound, sendResponse } from '../../../../helpers/helpers.js';

export const getAllLessonContents = asyncHandler(async (req, res) => {
    const lessonContents = await lessonContentService.getAllLessonContents();
    sendResponse(res, lessonContents);
});

export const getLessonContentById = asyncHandler(async (req, res) => {
    const lessonContent = await lessonContentService.getLessonContentById(req.params.id);
    lessonContent ? sendResponse(res, lessonContent) : sendNotFound(res, 'Lesson content not found');
});

export const createLessonContent = asyncHandler(async (req, res) => {
    const { content, quiz, status } = req.body;
    const insertedLessonContent = await lessonContentService.createLessonContent(content, quiz, status);
    sendResponse(res.status(201), insertedLessonContent);
});

export const updateLessonContent = asyncHandler(async (req, res) => {
    const { content, quiz, status } = req.body;
    const updatedLessonContent = await lessonContentService.updateLessonContent(req.params.id, content, quiz, status);
    updatedLessonContent ? sendResponse(res, updatedLessonContent) : sendNotFound(res, 'Lesson content not found');
});

export const deleteLessonContent = asyncHandler(async (req, res) => {
    const deletedRows = await lessonContentService.deleteLessonContent(req.params.id);
    deletedRows ? res.status(204).end() : sendNotFound(res, 'Lesson content not found');
});