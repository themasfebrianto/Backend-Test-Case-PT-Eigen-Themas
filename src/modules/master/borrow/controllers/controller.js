import * as borrowService from '../services/services.js';
import asyncHandler from 'express-async-handler';

export const borrowBook = asyncHandler(async (req, res) => {
    const { memberCode, bookCode } = req.body;
    const result = await borrowService.borrowBook(memberCode, bookCode);
    return res.status(201).json(result);
});
