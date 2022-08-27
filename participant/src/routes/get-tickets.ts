import express, { Request, Response } from 'express';
import {Ticket} from '../models/ticket';
import ObjectId from 'bson';

const router = express.Router();


router.get('/api/participant/:id/tickets', async (req: Request, res: Response) => {
    
    //TODO: Check if the user has access to this route
    
    const tickets = await Ticket.find({
        "participant.id": req.params.id
    });

    console.log(tickets);

    res.status(200).send(tickets);

    
})

export { router as getTicketsRouter };