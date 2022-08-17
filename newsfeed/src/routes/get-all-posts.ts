import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { currentUser } from '../middlewares/current-user';
import { errorHandler } from '../middlewares/error-handler';

import { Event } from '../models/event';

const router = express.Router();

router.get('/api/newsfeed/:eventId/post', 
    currentUser, 
    requireAuth, 
    [], 
    async (req: Request, res: Response) => {
        const { eventId } = req.params;
        const event = await Event.findByRefId(eventId).populate('Post');

        if (!event) {
            throw new Error('Event not found');
        }

        res.status(200).send({ event });

    }
)

export { router as getAllPostsRouter };
