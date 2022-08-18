import express, { Request, Response } from 'express';

import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { currentUser } from '../middlewares/current-user';
import { errorHandler } from '../middlewares/error-handler';
import { validateRequest } from '../middlewares/validate-request';

import { Event } from '../models/event';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put('/api/participant/checkin', [
    body('ticket_id').
        notEmpty().
        withMessage('Ticket id must be provided'),
], validateRequest, currentUser, requireAuth, errorHandler, async (req: Request, res: Response) => {
    const {ticket_id} = req.body;

    const ticket = await Ticket.findById(ticket_id);

    if (!ticket) {
        throw new Error('Ticket not found');
    }

    ticket.check_in.push({
        staff_id: req.currentUser!.id,
        time: new Date()
    });

    await ticket.save();

    res.status(200).send(ticket);
})

export { router as addCheckinRouter };