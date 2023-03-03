import Members from '../models/model.js';
import Borrow from '../../borrow/models/model.js';
import { sequelize } from '../../../../helpers/modelHelpers.js';

export const getAllMembers = async () => {
    return await Members.findAll({
        attributes: {
            include: [
                [sequelize.fn('COUNT', sequelize.col('memberBorrows.id')), 'borrowedBooks']
            ]
        },
        include: [
            {
                model: Borrow,
                as: 'memberBorrows',
                attributes: []
            }
        ],
        group: ['Members.code']
    });
};



export const getMemberByCode = async (code) => {
    return await Members.findByPk(code);
};

export const createMember = async (memberData) => {
    return await Members.create(memberData);
};

export const updateMember = async (code, memberData) => {
    const member = await Members.findByPk(code);
    if (!member) {
        return null;
    }
    return await member.update(memberData);
};

export const deleteMember = async (code) => {
    const member = await Members.findByPk(code);
    if (!member) {
        return 0;
    }
    await member.destroy();
    return 1;
};
