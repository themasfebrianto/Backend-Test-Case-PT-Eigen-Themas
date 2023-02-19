import * as lessonsGroupsService from '../services/services.js';
import { handleAsync } from '../../../../helpers/helpers.js';

export const getAllLessonsGroups = handleAsync(async (req, res) => {
    const lessonsGroups = await lessonsGroupsService.getAllLessonsGroups();
    return lessonsGroups;
});

export const getLessonsGroupById = handleAsync(async (req, res) => {
    const lessonsGroup = await lessonsGroupsService.getLessonsGroupById(req.params.id);
    return lessonsGroup;
});

export const createLessonsGroup = handleAsync(async (req, res) => {
    const insertedLessonsGroup = await lessonsGroupsService.createLessonsGroup(req.body);
    return insertedLessonsGroup;
});

export const updateLessonsGroup = handleAsync(async (req, res) => {
    const updatedLessonsGroup = await lessonsGroupsService.updateLessonsGroup(req.params.id, req.body);
    return updatedLessonsGroup;
});

export const deleteLessonsGroup = handleAsync(async (req, res) => {
    const numRows = await lessonsGroupsService.deleteLessonsGroup(req.params.id);
    return numRows;
});