import express, { Request, Response } from 'express';

import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { body } from 'express-validator';

import { Event } from '../models/event';
import { Order } from '../models/order';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/participant/event/:id/statistics', currentUser, requireAuth, async (req: Request, res: Response) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return res.status(404).send({ error: 'Event not found' });
    }

    const orders = await Order.find({ event_id: event._id }).populate('user_id', '_id name email', 'Participant');


    var total_income = 0;
    var total_participant = 0;
    orders.forEach((order:any) => {
        if (order.status === 'paid') {
            total_income += order.total_price;  
            total_participant += order.tickets[0].quantity;
        }
              
    });

    var total_tickets = 0;
    event.tickets.forEach((ticket:any) => {
        total_tickets += ticket.quantity;
    });

   
    //Calculate average rating
    var average_rating = 5;
    if (event.feedbacks.length > 0) {
        average_rating = event.total_rating / event.feedbacks.length;
    }


    //Calculate whether the ticket is checked in
    const tickets = await Ticket.find({ "event.id": event._id });

    var total_attendance = 0;
    tickets.forEach((ticket:any) => {
        if (ticket.check_in.length > 0) {
            total_attendance += ticket.quantity;
        }
    });




    res.send({
        ...event._doc,
        total_tickets,
        total_income,
        total_participant,
        average_rating,
        total_attendance,
        orders
    });



});

export { router as getEventStatisticsRouter };