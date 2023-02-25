import asyncHandler from 'express-async-handler';
import lessonsGroupsMenu from '../services/services.js';

export const getLessonsGroupsMenu = asyncHandler(async (req, res) => {
    const { lessonsGroups } = req.params;
    const menuData = await lessonsGroupsMenu(lessonsGroups);
    res.json(menuData);
});