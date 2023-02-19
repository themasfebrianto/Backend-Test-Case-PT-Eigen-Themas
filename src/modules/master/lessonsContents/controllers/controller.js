import * as lessonContentService from '../services/services.js';
import { handleAsync } from '../../../../helpers/helpers.js';

export const getAllLessonContents = handleAsync(async (req, res) => {
    const lessonContents = await lessonContentService.getAllLessonContents();
    return lessonContents;
});

export const getLessonContentById = handleAsync(async (req, res) => {
    const lessonContent = await lessonContentService.getLessonContentById(req.params.id);
    return lessonContent;

});

export const createLessonContent = handleAsync(async (req, res) => {
    const { content, quiz, status } = req.body;
    const insertedLessonContent = await lessonContentService.createLessonContent(content, quiz, status);
    return insertedLessonContent;
});

export const updateLessonContent = handleAsync(async (req, res) => {
    const { content, quiz, status } = req.body;
    const updatedLessonContent = await lessonContentService.updateLessonContent(req.params.id, content, quiz, status);
    return updatedLessonContent;
});

export const deleteLessonContent = handleAsync(async (req, res) => {
    const deletedRows = await lessonContentService.deleteLessonContent(req.params.id);
    return deletedRows;
});