import { Router } from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/userController.js';

const router = Router();


router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);


router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;