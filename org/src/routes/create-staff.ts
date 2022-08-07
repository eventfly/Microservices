import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { natsWrapper } from '../nats-wrapper';
import { currentUser } from '../middlewares/current-user';
import { validateRequest } from '../middlewares/validate-request';
import { Staff } from '../models/staff';
import { requireAuth } from '@thr_org/common';
import { errorHandler } from '../middlewares/error-handler';
import { ObjectId } from 'bson';

const router = express.Router();

router.post('/api/org/staff', [
    body('name').
        isLength({ min: 5, max: 50 }).
        withMessage('Name must be between 5 and 50 characters'),
    body('email').
        isEmail().
        withMessage('Email must be a valid email'),
    body('role').
        isIn(['organizer', 'staff']).
        withMessage('Role must be either organizer or staff'),
    body('events').
        isArray().
        withMessage('Events must be an array'),

], validateRequest, currentUser, requireAuth, errorHandler, async (req: Request, res: Response) => {
    let { name, email, role, events } = req.body;

    const existingUser = await Staff.findOne({ email });
    if (existingUser) {
        throw new Error('Email in use');
    } else {

        events = events.map((eventId: string) => {
            return {eventId: new ObjectId(eventId)}
        })

        const staff = await Staff.build({
            name,
            email,
            role,
            organizer: req.currentUser!.id,
            events
        });

        await staff.save();

        natsWrapper.client.publish('staff:created', JSON.stringify(
            { 
                name: staff.name,
                email: staff.email, 
                role: staff.role,
                ref_id: staff.id, 
                password: staff.otp!,
                is_verified: staff.is_verified,
                events: staff.events
            }
        ));

        res.status(201).send(staff);
    }


})

export { router as createStaffRouter };