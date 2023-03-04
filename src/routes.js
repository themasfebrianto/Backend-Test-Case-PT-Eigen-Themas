import express from 'express';
import bookRoutes from './modules/master/book/route.js';
import memberRoutes from './modules/master/member/route.js';
import borrowRoutes from './modules/master/borrow/route.js';

const router = express.Router();

router.use('/book', bookRoutes);
router.use('/member', memberRoutes);
router.use('/', borrowRoutes);

export default router;
