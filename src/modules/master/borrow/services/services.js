import { Op } from 'sequelize';
import Member from '../../member/models/model.js';
import Book from '../../book/models/model.js';
import Borrow from '../../borrow/models/model.js';
import { sequelize } from '../../../../helpers/modelHelpers.js';

const findMember = async (memberCode) => {
    const member = await Member.findOne({ where: { code: memberCode } });
    if (!member) {
        throw { status: 404, message: 'Member not found' };
    }
    return member;
};

const findBook = async (bookCode) => {
    const book = await Book.findOne({ where: { code: bookCode } });
    if (!book) {
        throw { status: 404, message: 'Book not found' };
    }
    return book;
};

const getBorrowedBooks = async (bookCode) => {
    return await Borrow.findAll({
        where: {
            bookCode: bookCode,
            returnedDate: {
                [Op.eq]: null,
            },
        },
        include: [{
            model: Member,
            as: 'member',
        }],
    });
};

const isBookBorrowedByAnotherMember = (borrowedBooks, memberCode) => {
    return borrowedBooks.some((borrow) => {
        return borrow.member.code !== memberCode && borrow.returnedDate === null;
    });
};

const findExistingBorrow = async (memberCode, bookCode) => {
    return await Borrow.findOne({
        where: {
            memberCode: memberCode,
            bookCode: bookCode,
            returnedDate: {
                [Op.eq]: null,
            },
        },
    });
};

export const borrowBook = async (memberCode, bookCode) => {
    try {
        const member = await findMember(memberCode);
        const book = await findBook(bookCode);

        if (member.borrowedBooks >= 2) {
            return { status: 400, message: 'Member has already borrowed maximum number of books' };
        }

        const borrowedBooks = await getBorrowedBooks(book.code);

        if (isBookBorrowedByAnotherMember(borrowedBooks, member.code)) {
            return { status: 400, message: 'Book is already borrowed by another member' };
        }

        const existingBorrow = await findExistingBorrow(member.code, book.code);

        if (existingBorrow) {
            return { status: 400, message: 'Member has already borrowed the book' };
        }

        if (book.stock < 1) {
            return { status: 400, message: 'Book is not available' };
        }

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7);

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
        return { status: error.status || 500, message: error.message || 'Internal server error' };
    }
};

const findBorrowRecord = async (memberCode, bookCode) => {
    const borrow = await Borrow.findOne({
        where: {
            memberCode,
            bookCode,
            returnedDate: {
                [Op.eq]: null,
            },
        },
        include: [{
            model: Book,
            as: 'book',
        }],
    });
    return borrow;
};

const updatePenaltyExpiry = async (member) => {
    const penaltyEndDate = new Date();
    penaltyEndDate.setDate(penaltyEndDate.getDate() + 3);
    member.penaltyExpiry = penaltyEndDate;
    await member.save();
};

const returnBookLate = async (borrow, member) => {
    const returnedDate = new Date();
    await borrow.update({ returnedDate });
    await updatePenaltyExpiry(member);
    await borrow.book.update({ stock: borrow.book.stock + 1 });
    await member.update({ borrowedBooks: member.borrowedBooks - 1 });
};

const returnBookOnTime = async (borrow, member) => {
    const returnedDate = new Date();
    await borrow.update({ returnedDate });
    await borrow.book.update({ stock: borrow.book.stock + 1 });
    await member.update({ borrowedBooks: member.borrowedBooks - 1 });
};

export const returnBook = async (memberCode, bookCode) => {
    try {
        const borrow = await findBorrowRecord(memberCode, bookCode);

        if (!borrow) {
            return { status: 404, message: 'Borrow record not found' };
        }

        const currentDate = new Date();
        const dueDate = new Date(borrow.dueDate);
        const daysLate = Math.round((currentDate - dueDate) / (1000 * 60 * 60 * 24));

        const member = await Member.findOne({ where: { code: memberCode } });
        if (!member) {
            return { status: 404, message: 'Member not found' };
        }

        if (daysLate > 7) {
            await returnBookLate(borrow, member);
            return { status: 400, message: 'Book returned late, member subject to penalty' };
        } else {
            await returnBookOnTime(borrow, member);
            return { status: 200, message: 'Book returned successfully' };
        }
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal server error' };
    }
};
