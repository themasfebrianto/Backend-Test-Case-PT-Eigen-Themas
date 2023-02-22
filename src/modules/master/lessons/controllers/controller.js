import * as lessonService from '../services/services.js';
import asyncHandler from 'express-async-handler';

export const getLessons = asyncHandler(async (req, res) => {
    const lessons = await lessonService.getAllLessons();
    res.json(lessons);
});

export const getLessonById = asyncHandler(async (req, res) => {
    const lesson = await lessonService.getLessonById(req.params.id);
    res.json(lesson);
});

export const createLesson = asyncHandler(async (req, res) => {
    const insertedLesson = await lessonService.createLesson(req.body);
    res.json(insertedLesson);
});

export const updateLesson = asyncHandler(async (req, res) => {
    const updatedLesson = await lessonService.updateLesson(req.params.id, req.body);
    res.json(updatedLesson);
});

export const deleteLesson = asyncHandler(async (req, res) => {
    const deletedRows = await lessonService.deleteLesson(req.params.id);
    res.json(deletedRows);
});