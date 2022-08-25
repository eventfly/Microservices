import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { currentUser } from '../middlewares/current-user';

import { errorHandler } from '../middlewares/error-handler';
import { Event } from '../models/event';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/event/:id/ticket', 
    currentUser, 
    requireAuth,
    [],
    async (req: Request, res: Response) => {

        const { id } = req.params;
        const {tickets} = req.body;
        const event = await Event.findOne({ref_id: id});

        if (!event) {
            throw new Error('Event not found');
        }
        
        tickets.forEach(async (ticket: any) => {
        
            event.tickets!.push({
                class: ticket.class,
                price: ticket.price,
                quantity: ticket.quantity,
                tokens: ticket.tokens,
                available: ticket.quantity
            });
    
        })

        await event.save();

        natsWrapper.client.publish('ticket:added', JSON.stringify({
            ref_id: id,
            tickets: tickets
        }));

        res.status(201).send({ event })
        

})

export { router as addTicketRouter }