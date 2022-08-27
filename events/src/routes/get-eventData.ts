import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import express, { Request, Response } from 'express';
import { errorHandler } from '../middlewares/error-handler';
import { Event } from '../models/event';

const router = express.Router();

router.get('/api/event/:id', [], currentUser, requireAuth, errorHandler, async (req: Request, res:Response) => {
    const event = await Event.findOne({ ref_id: req.params.id });

    var average_rating = 5;
    if (event.feedbacks.length > 0)
        average_rating = event.total_rating / event.feedbacks.length;

    res.status(200).send({
        event : {
            ...event._doc,
            average_rating
        }
    });
});

export { router as getEventDataRouter };