import * as lessonContentService from '../services/services.js';
import asyncHandler from 'express-async-handler';

export const getAllLessonContents = asyncHandler(async (req, res) => {
    const lessonContents = await lessonContentService.getAllLessonContents();
    res.json(lessonContents);
});

export const getLessonContentById = asyncHandler(async (req, res) => {
    const lessonContent = await lessonContentService.getLessonContentById(req.params.id);
    res.json(lessonContent);
});

export const createLessonContent = asyncHandler(async (req, res) => {
    const { content, quiz, status } = req.body;
    const insertedLessonContent = await lessonContentService.createLessonContent(content, quiz, status);
    res.status(201).json(insertedLessonContent);
});

export const updateLessonContent = asyncHandler(async (req, res) => {
    const { content, quiz, status } = req.body;
    const updatedLessonContent = await lessonContentService.updateLessonContent(req.params.id, content, quiz, status);
    res.json(updatedLessonContent);
});

export const deleteLessonContent = asyncHandler(async (req, res) => {
    const numRows = await lessonContentService.deleteLessonContent(req.params.id);
    res.json({ message: `${numRows} row(s) deleted.` });
});