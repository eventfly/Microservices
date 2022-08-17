import express, { Request, Response } from 'express';

import { body } from 'express-validator';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

import { Event } from '../models/event';
import { Order } from '../models/order';
import { natsWrapper } from '../nats-wrapper';
import { errorHandler } from '../middlewares/error-handler';
import { validateRequest } from '../middlewares/validate-request';


const router = express.Router();

router.post('/api/participant/order',
 [
    body('tickets').isArray().withMessage('Tickets must be an array')
 ],
    validateRequest,
    currentUser,
    requireAuth,
    errorHandler,
    async (req: Request, res: Response) => {
        const {tickets, eventId} = req.body;

        /*
        tickets: [
            {
                class,
                quantity,
                price
            }
        ]
        */

        const user_id = req.currentUser!.ref_id;
        const event = await Event.findOne({ref_id: eventId});

        if (!event) {
            throw new Error('Event not found');
        }


        //Calculate the total price
        let total_price = 0;

        tickets.forEach((ticket:any) => {
            const tkt = event.tickets!.find((t: any) => t.class === ticket.class);
            if (!tkt) {
                throw new Error('Ticket not found');
            }
            total_price += tkt.price * ticket.quantity;
        })

        //Check if there are enough tickets

        tickets.forEach((ticket: any) => {
            if (ticket.quantity > event!.tickets![ticket.class]) {
                throw new Error('Not enough tickets');
            }
        })
        
       

        //Update the number of tickets available after the order
        tickets.forEach(async (ticket: any) => {
            const tkt = event.tickets!.find((t: any) => t.class === ticket.class);
            tkt!.available -= ticket.quantity;
            await event.save();
        });



        const order = Order.build({
            user_id,
            event_id: event._id,
            tickets,
            created_at: new Date(),
            expiration_date: new Date(new Date().getTime() + (1000 * 60 * 15)),
            status: 'pending',
            total_price: total_price
        });

        await order.save();

        

        await natsWrapper.client.publish('order:created', JSON.stringify({
            id: order._id,
            user: order.user_id,
            event_id: order.event_id,
            tickets: order.tickets,
            created_at: order.created_at,
            expiration_date: order.expiration_date,
            status: order.status,
            total_price: order.total_price
        }) );

        res.status(201).send(order);
        

    });

export { router as createOrderRouter };