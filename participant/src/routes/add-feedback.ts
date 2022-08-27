import express, { Request, Response } from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { body } from 'express-validator';

import { Feedback } from '../models/feedback';
import { Event } from '../models/event';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/participant/feedback', [
    body('rating').isInt({ gt: 0, lt: 6 }).withMessage('Rating must be a number between 1 and 5'),
    body('comment').isString().withMessage('Comment must be a string'),
    body('event_id').isMongoId().withMessage('Event id must be a valid id'),
],
    validateRequest,
    currentUser,
    requireAuth, 
    async (req: Request, res: Response) => {

        const { event_id, rating, comment } = req.body;
        const user_id = req.currentUser!.ref_id;

        const event = await Event.findById(event_id);

        if (!event) {
            throw new Error('Event not found');
        }

        const feedback = await Feedback.build({
            user_id,
            event_id,
            rating,
            comment
        });

        event.feedbacks.push(feedback);

        await feedback.save();
        await event.save();


        await natsWrapper.client.publish('feedback:added', JSON.stringify({
            id: feedback.id,
            user_id: feedback.user_id,
            event_id: feedback.event_id,
            rating: feedback.rating,
            comment: feedback.comment
        }));

        res.status(201).send(feedback);
    }
)

export { router as createFeedbackRouter };