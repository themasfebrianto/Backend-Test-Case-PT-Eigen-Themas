import * as lessonsGroupsService from '../services/services.js';
import { asyncHandler, sendNotFound, sendResponse } from '../../../../helpers/helpers.js';

export const getAllLessonsGroups = asyncHandler(async (req, res) => {
    const lessonsGroups = await lessonsGroupsService.getAllLessonsGroups();
    sendResponse(res, lessonsGroups);
});

export const getLessonsGroupById = asyncHandler(async (req, res) => {
    const lessonsGroup = await lessonsGroupsService.getLessonsGroupById(req.params.id);
    lessonsGroup ? sendResponse(res, lessonsGroup) : sendNotFound(res, 'Lessons group not found');
});

export const createLessonsGroup = asyncHandler(async (req, res) => {
    const insertedLessonsGroup = await lessonsGroupsService.createLessonsGroup(req.body);
    sendResponse(res.status(201), insertedLessonsGroup);
});

export const updateLessonsGroup = asyncHandler(async (req, res) => {
    const updatedLessonsGroup = await lessonsGroupsService.updateLessonsGroup(req.params.id, req.body);
    updatedLessonsGroup ? sendResponse(res, updatedLessonsGroup) : sendNotFound(res, 'Lessons group not found');
});

export const deleteLessonsGroup = asyncHandler(async (req, res) => {
    const numRows = await lessonsGroupsService.deleteLessonsGroup(req.params.id);
    if (numRows > 0) {
        res.status(204).end();
    } else {
        sendNotFound(res, 'Lessons group not found');
    }
});