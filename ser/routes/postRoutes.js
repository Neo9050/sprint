import express from 'express';
import {
    deletePost,
    likePost,
    commentPost,
    getUserPosts,
    getAllPosts
  } from '../controllers/postController.js';
  
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();


router.get('/all', verifyToken, getAllPosts);
router.post('/:id/like', verifyToken, likePost);
router.post('/:id/comment', verifyToken, commentPost);
router.get('/:userId/posts', verifyToken, getUserPosts);
router.delete('/delete/:postId', verifyToken, deletePost);


export default router;




// router.get('/', verifyToken, getAllPosts);
// router.post('/:id/like', verifyToken, likePost);
// router.post('/:id/comment', verifyToken, commentPost);
// router.get('/:userId/posts', verifyToken, getUserPosts);
// router.delete('/delete/:postId', verifyToken, deletePost);





// router.get('/',  getAllPosts);
// router.post('/:id/like', likePost);
// router.post('/:id/comments',  commentPost);
// router.get('/:userId/posts', getUserPosts);
// router.delete('/delete/:postId', verifyToken, deletePost);
