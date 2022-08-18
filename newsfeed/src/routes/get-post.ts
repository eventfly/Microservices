import express, { Request, Response } from 'express';

import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { currentUser } from '../middlewares/current-user';
import { errorHandler } from '../middlewares/error-handler';
import { validateRequest } from '../middlewares/validate-request';
import { Post } from '../models/post';

const router = express.Router();

router.get('/api/newsfeed/post/:postId', currentUser, requireAuth, errorHandler, async (req: Request, res: Response) => {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate('comments');

    if (!post) {
        throw new Error('Post not found');
    }

    res.status(200).send({ post });
});

export { router as getPostRouter };