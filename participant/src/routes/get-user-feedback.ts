import express, { Request, Response } from 'express';

import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { Feedback } from '../models/feedback';

const router = express.Router();

router.get('/api/participant/:id/feedbacks' , 
    currentUser, 
    requireAuth, 
    [], 
    validateRequest, async (req: Request, res: Response) => {

        const { id } = req.params;

        const feedbacks = await Feedback.find({user_id: id}).populate('event_id', 'name');

        res.send(feedbacks);

});

export { router as getUserFeedbackRouter };