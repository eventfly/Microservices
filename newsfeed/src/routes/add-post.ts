import express, { Request, Response } from 'express';
import { currentUser } from '../middlewares/current-user';
import { errorHandler } from '../middlewares/error-handler';
import { requireAuth } from '../middlewares/require-auth';
import { body } from 'express-validator';
import { Post } from '../models/post';

const router = express.Router();

router.post('/api/newsfeed/post',
    [

    ],
    currentUser,
    requireAuth,
    errorHandler,
    async (req: Request, res: Response) => {
        
        //Get post data from request body
        const {
            title,
            content,
            event_id,
            poll_options,
            questions,
            creator_id
            

        } = req.body;
        //Add a post to the database

        const post = await Post.create({});



})