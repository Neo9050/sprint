import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getUserId,
  getUsernameByEmail,
  getUserById,
  getAllUserIds,
  getUserByUsername,
} from '../controllers/userController.js';

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.get('/userId', verifyToken, getUserId);
router.get('/username/:email', verifyToken, getUsernameByEmail);
router.get('/:id', getUserById);
router.get('/users', getAllUserIds);
router.get('/username/:username', getUserByUsername);

export default router;
