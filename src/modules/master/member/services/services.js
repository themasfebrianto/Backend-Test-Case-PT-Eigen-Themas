import Members from '../models/model.js';
import Borrow from '../../borrow/models/model.js';
import Book from '../../book/models/model.js';
import { sequelize } from '../../../../helpers/modelHelpers.js';

export const getAllMembers = async () => {
    try {
        return await Members.findAll({
            attributes: {
                include: [
                    [
                        sequelize.literal(
                            '(SELECT COUNT(*) FROM "Borrows" WHERE "Borrows"."memberCode" = "Members"."code" AND "Borrows"."returnedDate" IS NULL)'
                        ),
                        'borrowedBooks',
                    ],
                ],
            },
            include: [
                {
                    model: Borrow,
                    as: 'memberBorrows',
                    required: false,
                    attributes: ['dueDate'],
                    include: [
                        {
                            model: Book,
                            as: 'book',
                            attributes: ['title', 'author'],
                        },
                    ],
                    where: { returnedDate: null },
                },
            ],
        });

    } catch (error) {
        console.error(error);
        throw error;
    }
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
