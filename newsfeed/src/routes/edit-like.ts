import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { currentUser } from '../middlewares/current-user';
import { Activity } from '../models/activity';
import { Post } from '../models/post';

const router = express.Router();

router.put('/api/newsfeed/edit-like', 
    currentUser,
    requireAuth, 
    [
        body('post_id').
            not().
            isEmpty().
            withMessage('post_id is required')
    ], 
    async (req: Request, res: Response) => {
        const { post_id } = req.body;

        let activity = await Activity.find({
            post_id: post_id,
            user_id: req.currentUser!.ref_id
        });

        if (!activity) {
            activity = Activity.build({
                user_id: req.currentUser!.ref_id,
                post_id: post_id,
            });

            await activity.save();
        }

        activity.is_liked = !activity.is_liked;
        

        const post = await Post.findById(post_id);
        
        if (!post) {
            throw new Error('Post not found');
        }

        post.like_count = post.like_count + (activity.is_liked ? 1 : -1);
        
        await activity.save();
        await post.save();

        res.status(200).send(activity);

});

export { router as editLikeRouter };
