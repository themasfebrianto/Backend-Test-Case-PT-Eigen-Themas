import { Op } from 'sequelize';
import Member from '../../member/models/model.js';
import Book from '../../book/models/model.js';
import Borrow from '../../borrow/models/model.js';
import { sequelize } from '../../../../helpers/modelHelpers.js';


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

        const borrowedBooks = await Borrow.findAll({
            where: {
                bookCode: book.code,
                returnedDate: {
                    [Op.eq]: null,
                },
            },
            include: [{
                model: Member,
                as: 'member',
            }],
        });

        const isBorrowedByAnotherMember = borrowedBooks.some((borrow) => {
            return borrow.member.code !== member.code && borrow.returnedDate === null;
        });


        const existingBorrow = await Borrow.findOne({
            where: {
                memberCode: member.code,
                bookCode: book.code,
                returnedDate: {
                    [Op.eq]: null,
                },
            },
        });

        if (existingBorrow) {
            return { status: 400, message: 'Member has already borrowed the book' };
        }

        if (book.stock < 1) {
            return { status: 400, message: 'Book is not available' };
        }

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7); // set due date to 7 days from today

        const transaction = await Borrow.create({
            memberCode: member.code,
            bookCode: book.code,
            borrowedDate: new Date(),
            dueDate: dueDate,
        });

        await book.update({ stock: book.stock - 1 });
        await member.update({ borrowedBooks: member.borrowedBooks + 1 });

        return { status: 200, message: 'Book borrowed successfully', data: transaction };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal server error' };
    }
};



export const returnBook = async (memberCode, bookCode) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const borrow = await Borrow.findOne({
            where: {
                memberCode,
                bookCode,
                returnedDate: {
                    [Op.eq]: null,
                },
            },
            transaction,
        });

        if (!borrow) {
            await transaction.rollback();
            return { status: 404, message: 'Borrow record not found' };
        }

        const book = await Book.findOne({ where: { code: bookCode }, transaction });

        if (!book) {
            await transaction.rollback();
            return { status: 404, message: 'Book not found' };
        }

        const currentDate = new Date();
        const dueDate = new Date(borrow.dueDate);
        const daysLate = Math.round((currentDate - dueDate) / (1000 * 60 * 60 * 24));

        if (daysLate > 7) {
            // Update the penalty expiry for the member
            const returnedDate = new Date();
            await borrow.update({ returnedDate }, { transaction });
            const penaltyEndDate = new Date();
            penaltyEndDate.setDate(penaltyEndDate.getDate() + 3);
            const member = await Member.findOne({ where: { code: memberCode }, transaction });
            if (!member) {
                await transaction.rollback();
                return { status: 404, message: 'Member not found' };
            }
            member.penaltyExpiry = penaltyEndDate;
            await member.save({ transaction });

            // Update book stock and member borrowedBooks
            await book.update({ stock: book.stock + 1 }, { transaction });
            await member.update({ borrowedBooks: member.borrowedBooks - 1 }, { transaction });

            await transaction.commit();
            return { status: 400, message: 'Book returned late, member subject to penalty' };
        } else {
            const returnedDate = new Date();
            await borrow.update({ returnedDate }, { transaction });
            await book.update({ stock: book.stock + 1 }, { transaction });
            const member = await Member.findOne({ where: { code: memberCode }, transaction });
            if (!member) {
                await transaction.rollback();
                return { status: 404, message: 'Member not found' };
            }
            await member.update({ borrowedBooks: member.borrowedBooks - 1 }, { transaction });
            await transaction.commit();
            return { status: 200, message: 'Book returned successfully' };
        }

    } catch (error) {
        console.error(error);
        if (transaction) await transaction.rollback();
        return { status: 500, message: 'Internal server error' };
    }
};




