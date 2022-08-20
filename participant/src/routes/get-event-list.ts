import express, { Request, Response } from 'express';

import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { currentUser } from '../middlewares/current-user';
import { errorHandler } from '../middlewares/error-handler';
import { validateRequest } from '../middlewares/validate-request';

import { Participant } from '../models/participant';
import { Ticket } from '../models/ticket';
import {Event} from '../models/event';

const router = express.Router();

router.get('/api/participant/:id/events', [], validateRequest, currentUser, requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    
    // const user = await Participant.findById(id).populate('events');

    // if (!user) {
    //     throw new Error('User not found');
    // }

    // res.status(200).send(user.events);
    
    const tickets = await Ticket.find({
        "participant.id": id
    }).populate('event');

    const events = tickets.map((ticket:any) => ticket.event);

    events.forEach(async (event:any) => {
        console.log(event);
        const e = await Event.findById(event.id);
        res.status(200).send(e);
    });

    // res.status(200).send(eventData);

})

export { router as getEventListRouter };