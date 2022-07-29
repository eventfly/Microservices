import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import express, { Request, Response } from 'express';
import { errorHandler } from '../middlewares/error-handler';
import { Event } from '../models/event';

const router = express.Router();

router.get('/api/event/all', [], currentUser, requireAuth, errorHandler, async (req: Request, res:Response) => {
    const events = await Event.find({ });
    res.status(200).send(events);
});

export { router as getEventsRouter };