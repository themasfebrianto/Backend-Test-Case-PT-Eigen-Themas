import Books from '../models/model.js';

export const getAllBooks = async () => {
    const books = await Books.findAll();
    return books;
};

export const getBookByCode = async (code) => {
    const book = await Books.findByPk(code);
    return book;
};

export const createBook = async (bookData) => {
    const book = await Books.create(bookData);
    return book;
};

export const updateBook = async (code, bookData) => {
    const [numRows, [updatedBook]] = await Books.update(
        { title: bookData.title, author: bookData.author, stock: bookData.stock },
        { where: { code }, returning: true }
    );
    return numRows > 0 ? updatedBook : null;
};

export const deleteBook = async (code) => {
    const numRows = await Books.destroy({ where: { code } });
    return numRows;
};
