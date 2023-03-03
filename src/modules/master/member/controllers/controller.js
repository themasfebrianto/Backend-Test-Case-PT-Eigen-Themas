import * as memberService from '../services/services.js';
import asyncHandler from 'express-async-handler';

export const getMembers = asyncHandler(async (req, res) => {
    const members = await memberService.getAllMembers();
    res.json(members);
});

export const getMemberById = asyncHandler(async (req, res) => {
    const member = await memberService.getMemberById(req.params.id);
    res.json(member);
});

export const createMember = asyncHandler(async (req, res) => {
    const insertedMember = await memberService.createMember(req.body);
    res.json(insertedMember);
});

export const updateMember = asyncHandler(async (req, res) => {
    const updatedMember = await memberService.updateMember(req.params.id, req.body);
    res.json(updatedMember);
});

export const deleteMember = asyncHandler(async (req, res) => {
    const deletedRows = await memberService.deleteMember(req.params.id);
    res.json(deletedRows);
});
