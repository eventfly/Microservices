import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { currentUser } from '../middlewares/current-user';
import { errorHandler } from '../middlewares/error-handler';

import { Event } from '../models/event';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

const router = express.Router();

router.get('/api/newsfeed/post/:postId/comment', currentUser, requireAuth,
    [], async (req: Request, res: Response) => {
        const { postId } = req.params;
        
        const post = await Post.findById(postId).populate({
            path: 'comments',
            populate: {
                'path': 'creator.id',
                'model' : 'User',
                'select': '_id name role avatar'
            }
        });

        if (!post) {
            throw new Error('Post not found');
        }

        res.status(200).send({ post });

    })

    export { router as getCommentRouter };
