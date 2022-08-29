import express, { Request, Response } from 'express';

import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { currentUser } from '../middlewares/current-user';
import { errorHandler } from '../middlewares/error-handler';
import { validateRequest } from '../middlewares/validate-request';
import { Post } from '../models/post';
import { Activity } from '../models/activity';
import { addPostRouter } from './add-post';


const router = express.Router();

router.get('/api/newsfeed/post/:postId', currentUser, requireAuth, errorHandler, async (req: Request, res: Response) => {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate('comments');

    if (!post) {
        throw new Error('Post not found');
    }


    const id = post._id;

    const activities = await Activity.find({post_id: id});
        
    let poll_options = post.poll_options;
    
    console.log(post.poll_options);

    if (post.poll_options.length > 0) {
        activities.forEach( async ( activity : any) => {
            const poll_answers = activity.poll_options;

            poll_answers.forEach( (element:any) => {
                if (element.is_selected) {
                    poll_options[element.index].count += 1;
                }
                
            })

        })
    }


    res.status(200).send({ post });
});

export { router as getPostRouter };