import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth';
import { Ticket } from '../models/event';
import { currentUser } from '../middlewares/current-user';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/org', [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be provided and must be greater than 0')
], validateRequest, currentUser, requireAuth, async (req: Request, res: Response) => {

    const { title, price } = req.body;

    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    })

    await ticket.save();

    //Send to the queue -- Publisher code
    new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: parseInt(ticket.price),
        userId: ticket.userId
    })

    res.status(201).send(ticket);

})

export { router as createTicketRouter };