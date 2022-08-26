import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { ObjectId } from 'bson';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { errorHandler } from '../middlewares/error-handler';
import { validateRequest } from '../middlewares/validate-request';

import { Activity } from '../models/activity';

const router = express.Router();

router.post('/api/newsfeed/post/:postId/comment', [
    body('content').trim().isLength({ min: 1 })
], validateRequest, currentUser, requireAuth, errorHandler, 
    async (req: Request, res: Response) => {
        const { postId } = req.params;
        const { content } = req.body;

        const user = await User.findById(req.currentUser!.ref_id);
        const post = await Post.findById(postId);

        var activity = await Activity.findOne({
            post_id: postId,
            user_id: req.currentUser!.ref_id
        });
        
        if (!activity) {
            activity = Activity.build({
                user_id: req.currentUser!.ref_id,
                post_id: postId,
            });

            await activity.save();
        }


        if (!post) {
            throw new Error('Post not found');
        }

        const comment = new Comment({
            post_id: postId,
            creator: {
                id: user!._id,
            },
            content: content,
            created_at: new Date(),
            updated_at: new Date()
        });
        

        post.comments!.push(comment._id);
        activity.comments!.push(comment._id);
        
        await comment.save();
        await post.save();
        await activity.save();

        res.status(201).send({ post });
    }
)

export { router as addCommentRouter };

