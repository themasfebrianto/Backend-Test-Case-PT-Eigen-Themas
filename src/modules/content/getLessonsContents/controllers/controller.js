import asyncHandler from 'express-async-handler';
import getLessonContents from '../services/services.js';

export const getLessonContentsById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const contents = await getLessonContents(id);
    res.json(contents);
});