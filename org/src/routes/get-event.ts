import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Event } from '../models/event';
import { errorHandler } from '../middlewares/error-handler';

const router = express.Router();

router.get('/api/org/event/:orgId', [
    body('orgId').
        isMongoId().
        withMessage('Organization ID must be a valid ID'),
], 
// currentUser, requireAuth,
 errorHandler, async (req: Request, res: Response) => {
    const { orgId } = req.params;

    console.log('x-access-token:', req.headers['x-access-token']);

    const events = await Event.find({ organizer: orgId });
    res.send(events);
})

export { router as getEventRouter };