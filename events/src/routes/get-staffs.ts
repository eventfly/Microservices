import express, { Request, Response } from 'express';
import { errorHandler } from '../middlewares/error-handler';
import { Event } from '../models/event';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';


const router = express.Router();

router.get('/api/event/staff/:eventId', [], currentUser, requireAuth, errorHandler, async (req: Request, res:Response) => {
    const event = await Event.find({ref_id: req.params.eventId});
    
    if (!event) {
        throw new Error('Event not found');
    }

    res.status(200).send(event);
})