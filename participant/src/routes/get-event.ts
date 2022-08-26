import express, { Request, Response } from 'express';

import { Event } from '../models/event';

import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { errorHandler } from '../middlewares/error-handler';
import { body } from 'express-validator';

const router = express.Router();

router.get('/api/participant/event/:id', [],
    validateRequest,
    currentUser,
    requireAuth,
    errorHandler,
    async (req: Request, res: Response) => {
        
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) {
            throw new Error('Event not found');
        }
        res.send(event);
    

});

export { router as getEventRouter };
