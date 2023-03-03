import * as bookService from '../services/services.js';
import asyncHandler from 'express-async-handler';

export const getBooks = asyncHandler(async (req, res) => {
    const books = await bookService.getAllBooks();
    return res.status(200).json(books);
});

export const getBookByCode = asyncHandler(async (req, res) => {
    const book = await bookService.getBookByCode(req.params.code);
    return res.status(200).json(book);
});

export const createBook = asyncHandler(async (req, res) => {
    const insertedBook = await bookService.createBook(req.body);
    return res.status(201).json(insertedBook);
});

export const updateBook = asyncHandler(async (req, res) => {
    const updatedBook = await bookService.updateBook(req.params.code, req.body);
    return res.status(200).json(updatedBook);
});

export const deleteBook = asyncHandler(async (req, res) => {
    const numRows = await bookService.deleteBook(req.params.code);
    return res.status(204).json(numRows);
});
