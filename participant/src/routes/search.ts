import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { requireAuth } from '../middlewares/require-auth';
import { currentUser } from '../middlewares/current-user';
import { errorHandler } from '../middlewares/error-handler';
import { Event } from '../models/event';

const router = express.Router();

router.get('/api/participant/search', currentUser, requireAuth, [], async (req: Request, res: Response) => {
    const { query, parameter } = req.query;
    
    const events = await Event.aggregate([
      { $match: { $text: { $search: `${query}` } }}
    ])

    console.log(events)


    res.status(200).send({ events });  
})

export { router as searchRouter }