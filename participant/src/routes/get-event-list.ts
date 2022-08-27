import express, { Request, Response } from 'express';

import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { currentUser } from '../middlewares/current-user';
import { errorHandler } from '../middlewares/error-handler';
import { validateRequest } from '../middlewares/validate-request';

import { Participant } from '../models/participant';

const router = express.Router();

router.get('/api/participant/:id/events', [], validateRequest, currentUser, requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const user = await Participant.findById(id).populate('events');

    if (!user) {
        throw new Error('User not found');
    }

    const events = user.events;

    res.status(200).send(events);

})

export { router as getEventListRouter };