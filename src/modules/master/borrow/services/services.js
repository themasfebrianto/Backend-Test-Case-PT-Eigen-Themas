import { Op } from 'sequelize';
import Member from '../../member/models/model.js';
import Book from '../../book/models/model.js';
import Borrow from '../../borrow/models/model.js';

export const borrowBook = async (memberCode, bookCode) => {
    try {
        const member = await Member.findOne({ where: { code: memberCode } });
        const book = await Book.findOne({ where: { code: bookCode } });

        if (!member || !book) {
            return { status: 404, message: 'Member or book not found' };
        }

        if (member.borrowedBooks >= 2) {
            return { status: 400, message: 'Member has already borrowed maximum number of books' };
        }

        const borrowedBooks = await Borrow.count({
            where: {
                memberCode: member.code,
                returnedDate: {
                    [Op.eq]: null,
                },
            },
        });

        if (borrowedBooks >= 2) {
            return { status: 400, message: 'Member has already borrowed maximum number of books' };
        }

        if (book.stock < 1) {
            return { status: 400, message: 'Book is not available' };
        }

        const transaction = await Borrow.create({
            memberCode: member.code,
            bookCode: book.code,
            borrowedAt: new Date(),
        });

        await book.update({ stock: book.stock - 1 });
        await member.update({ borrowedBooks: member.borrowedBooks + 1 });

        return { status: 200, message: 'Book borrowed successfully', data: transaction };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal server error' };
    }
};
