import Member from '../models/model.js';

export const getAllMembers = async () => {
    return await Member.findAll();
};

export const getMemberById = async (code) => {
    return await Member.findByPk(code);
};

export const createMember = async (memberData) => {
    return await Member.create(memberData);
};

export const updateMember = async (code, memberData) => {
    const member = await Member.findByPk(code);
    if (!member) {
        return null;
    }
    return await member.update(memberData);
};

export const deleteMember = async (code) => {
    const member = await Member.findByPk(code);
    if (!member) {
        return 0;
    }
    await member.destroy();
    return 1;
};
