import express, { Request, Response } from 'express';
import {Ticket} from '../models/ticket';
import ObjectId from 'bson';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();


router.get('/api/participant/:id/tickets', 
    currentUser, requireAuth,
    async (req: Request, res: Response) => {

    const tickets = await Ticket.find({
        "participant": req.params.id
    }).populate('participant', '_id name email');

    console.log(tickets);

    res.status(200).send(tickets);

    
});

export { router as getTicketsRouter };