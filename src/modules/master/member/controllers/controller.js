import * as memberService from '../services/services.js';
import asyncHandler from 'express-async-handler';

export const getMembers = asyncHandler(async (req, res) => {
    const members = await memberService.getAllMembers();
    res.json(members);
});

export const getMemberByCode = asyncHandler(async (req, res) => {
    const member = await memberService.getMemberByCode(req.params.code);
    res.json(member);
});

export const createMember = asyncHandler(async (req, res) => {
    const insertedMember = await memberService.createMember(req.body);
    res.json(insertedMember);
});

export const updateMember = asyncHandler(async (req, res) => {
    const updatedMember = await memberService.updateMember(req.params.code, req.body);
    res.json(updatedMember);
});

export const deleteMember = asyncHandler(async (req, res) => {
    const deletedRows = await memberService.deleteMember(req.params.code);
    res.json(deletedRows);
});
