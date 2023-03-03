import express from 'express';
import {
    getMembers,
    getMemberByCode,
    createMember,
    updateMember,
    deleteMember
} from './controllers/controller.js';

const router = express.Router();

router.get('/', getMembers);
router.get('/:code', getMemberByCode);
router.post('/', createMember);
router.put('/:code', updateMember);
router.delete('/:code', deleteMember);

export default router;
