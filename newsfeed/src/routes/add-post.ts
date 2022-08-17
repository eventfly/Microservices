import express, { Request, Response } from 'express';
import { currentUser } from '../middlewares/current-user';
import { errorHandler } from '../middlewares/error-handler';
import { requireAuth } from '../middlewares/require-auth';
import { Post } from '../models/post';
import { User } from '../models/user';
import { Event } from '../models/event';
import { Feed } from '../models/feed';

import { body } from 'express-validator';
const router = express.Router();

router.post('/api/newsfeed/:eventId/post',
    [  
        body('title').trim().notEmpty().withMessage('Title is required'),
        body('content').trim().notEmpty().withMessage('Content is required'),
    ],
    currentUser,
    requireAuth,
    errorHandler,
    async (req: Request, res: Response) => {
        
        //Get decoded user info from currentUser middleware
        const { id, email, name, role, ref_id } = req.currentUser!;
        const { eventId } = req.params;

        const user = User.findByRefId(ref_id);


        //Get post data from request body
        const {
            title,
            content,
            poll_options,
            questions
        } = req.body;

        //Add a post to the database

        const post = Post.build({
            event_id: eventId,
            creator: {
                id: user.ref_id,
                name: user.name,
                role: role,
                avatar: user.avatar
            },
            content,
            poll_options,
            questions,
            title,
            created_at: new Date(),
            updated_at: new Date()

        });

        await post.save();

        // Add post to event


        const event = Event.findByRefId(eventId);
        event.posts.push(post._id);
        await event.save();

        const followers = await Event.getFollowers(event._id);

        //Add to feed for each follower
        followers.forEach(async (follower: any) => {
            const user = User.findByRefId(follower);
            Feed.addPost(user._id, post._id);
        })



        res.status(201).send(post);
})

export { router as addPostRouter };