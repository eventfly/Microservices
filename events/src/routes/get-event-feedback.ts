import express, { Request, Response } from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { errorHandler } from '../middlewares/error-handler';

import { Event } from '../models/event';

const router = express.Router();

router.get('/api/event/:id/feedbacks', [], 
    validateRequest, currentUser, 
    requireAuth, errorHandler, 
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const event = await Event.findOne({ref_id : id}).populate('feedbacks');
        
        if (!event) {
            throw new Error('Event not found');
        }

        res.send(event.feedbacks);
});

export { router as getEventFeedbacksRouter };