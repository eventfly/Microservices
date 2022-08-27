import express, { Request, Response } from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { body } from 'express-validator';

import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { Activity } from '../models/activity';

const router = express.Router();

router.delete('/api/newsfeed/post/:id', 
    currentUser, 
    requireAuth, 
    async (req: Request, res: Response) => {

        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            throw new Error('Post not found');
        }

        //Delete all comments associated with this post

        const comments = await Comment.deleteMany({ post_id: req.params.id });
        
        //Delete all activities associated with this post
        const activities = await Activity.deleteMany({ post_id: req.params.id });

        
        res.status(204).send(post);
    }
);

export { router as deletePostRouter };