import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Event } from '../models/event';
import { errorHandler } from '../middlewares/error-handler';

import mongoose, {Types} from 'mongoose';
import { ObjectId } from 'bson';

const router = express.Router();

router.get('/api/org/event/:orgId', [
    body('orgId').
        isMongoId().
        withMessage('Organization ID must be a valid ID'),
], 
currentUser, requireAuth,
 errorHandler, async (req: Request, res: Response) => {
    const { orgId } = req.params;

    const events = await Event.find({ organizer: new ObjectId(orgId) });
    res.send(events);
})

export { router as getEventRouter };