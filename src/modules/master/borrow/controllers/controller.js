import * as lessonsGroupsService from '../services/services.js';
import asyncHandler from 'express-async-handler';

export const getAllLessonsGroups = asyncHandler(async (req, res) => {
    const lessonsGroups = await lessonsGroupsService.getAllLessonsGroups();
    return res.json(lessonsGroups);
});

export const getLessonsGroupById = asyncHandler(async (req, res) => {
    const lessonsGroup = await lessonsGroupsService.getLessonsGroupById(req.params.id);
    return res.json(lessonsGroup);
});

export const createLessonsGroup = asyncHandler(async (req, res) => {
    const insertedLessonsGroup = await lessonsGroupsService.createLessonsGroup(req.body);
    return res.status(201).json(insertedLessonsGroup);
});

export const updateLessonsGroup = asyncHandler(async (req, res) => {
    const updatedLessonsGroup = await lessonsGroupsService.updateLessonsGroup(req.params.id, req.body);
    return res.json(updatedLessonsGroup);
});

export const deleteLessonsGroup = asyncHandler(async (req, res) => {
    const numRows = await lessonsGroupsService.deleteLessonsGroup(req.params.id);
    return res.json({ message: `${numRows} row(s) deleted.` });
});