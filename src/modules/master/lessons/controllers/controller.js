import * as lessonService from '../services/services.js';
import { handleAsync } from '../../../../helpers/helpers.js';

export const getLessons = handleAsync(async (req, res) => {
    const lessons = await lessonService.getAllLessons();
    return lessons;
});

export const getLessonById = handleAsync(async (req, res) => {
    const lesson = await lessonService.getLessonById(req.params.id);
    return lesson;
});

export const createLesson = handleAsync(async (req, res) => {
    const insertedLesson = await lessonService.createLesson(req.body);
    return insertedLesson;
});

export const updateLesson = handleAsync(async (req, res) => {
    const updatedLesson = await lessonService.updateLesson(req.params.id, req.body);
    return updatedLesson;
});

export const deleteLesson = handleAsync(async (req, res) => {
    const deletedRows = await lessonService.deleteLesson(req.params.id);
    return deletedRows;
});