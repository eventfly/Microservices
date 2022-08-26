import express, { Request, Response } from 'express';
import { currentUser } from '../middlewares/current-user';
import { errorHandler } from '../middlewares/error-handler';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';

import { Post } from '../models/post';
import { User } from '../models/user';
import { Event } from '../models/event';
import { Feed } from '../models/feed';

import { body } from 'express-validator';
const router = express.Router();

router.post('/api/newsfeed/:eventId/post',
    [  
        // body('title').trim().notEmpty().withMessage('Title is required'),
        body('content').trim().notEmpty().withMessage('Content is required'),
    ],
    validateRequest,
    currentUser,
    requireAuth,
    errorHandler,
    async (req: Request, res: Response) => {
        
        //Get decoded user info from currentUser middleware
        const { id, email, name, role, ref_id } = req.currentUser!;
        const { eventId } = req.params;        

        const user = await User.findById(ref_id);

        console.log(user);

        //Get post data from request body
        const {
            // title,
            content,
            image,
            poll_options,
            questions
        } = req.body;

        //Add a post to the database

        const post = Post.build({
            event_id: eventId,
            creator: {
                id: user._id,
                name: user.name,
                role: role,
                avatar: user.avatar
            },
            content,
            poll_options,
            questions,
            created_at: new Date(),
            updated_at: new Date(),
            image: image
        });

        

        // Add post to event


        const event = await Event.findById(eventId);
        
        if (!event) {
            throw new Error('Event not found');
        }

        event.posts.push(post._id);


        await post.save();
        await event.save();

        const followers = event.followers;

    
        //Add to feed for each follower
        followers.forEach(async (follower: any) => {
            
            await Feed.addPost(follower, post._id);
            
        });


        res.status(201).send({post});
})

export { router as addPostRouter };