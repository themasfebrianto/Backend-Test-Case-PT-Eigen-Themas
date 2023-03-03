// modules/book/routes.js
import express from 'express';
import {
    getBooks,
    getBookByCode,
    createBook,
    updateBook,
    deleteBook
} from './controllers/controller.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:code', getBookByCode);
router.post('/', createBook);
router.put('/:code', updateBook);
router.delete('/:code', deleteBook);

export default router;
