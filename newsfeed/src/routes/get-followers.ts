import express, { Request, Response } from 'express';

import { body } from 'express-validator';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Event } from '../models/event';

const router = express.Router();

router.get('/api/newsfeed/:eventId/followers', [] ,currentUser, requireAuth, async (req: Request, res: Response) => {
    //Get all followers from eventId

    const { eventId } = req.params;
    console.log("fetching followers for event ", eventId);
    const event = await Event.findById(eventId).populate('followers');

    if (!event) {
        throw new Error('Event not found');
    }

    res.status(200).send({ followers: event.followers });
})