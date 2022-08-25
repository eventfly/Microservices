import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Event } from '../models/event';
import { Staff } from '../models/staff';
import { errorHandler } from '../middlewares/error-handler';
import { ObjectId } from 'bson';

const router = express.Router();

router.get('/api/org/event/staff/:staffId', 
currentUser, 
requireAuth,
errorHandler, 

async (req: Request, res: Response) => {
    const { staffId } = req.params;
    const staff = await Staff.findById(staffId);

    const ids = staff!.events!.map((element: any) => {
        return element!.eventId
    });

    const eventsByStaff = await Event.find({"_id": {
        "$in": ids
    }});

    
    res.status(201).send(eventsByStaff);
})

export { router as getEventsByStaffRouter };