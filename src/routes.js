import express from 'express';
import bookRoutes from './modules/master/book/route.js';
import memberRoutes from './modules/master/member/route.js';

const router = express.Router();

router.use('/book', bookRoutes);
router.use('/member', memberRoutes);

export default router;
