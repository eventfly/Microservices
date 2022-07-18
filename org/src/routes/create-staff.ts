import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { natsWrapper } from '../nats-wrapper';
import { currentUser } from '../middlewares/current-user';
import { validateRequest } from '../middlewares/validate-request';
import { Staff } from '../models/staff';

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
        withMessage('Role must be either admin or staff'),

], validateRequest, currentUser, async (req: Request, res: Response) => {
    const { name, email, role } = req.body;

    const existingUser = await Staff.findOne({ email });
    if (existingUser) {
        throw new Error('Email in use');
    } else {
        const staff = await Staff.build({
            name,
            email,
            role,
            organizer: req.currentUser!.id,
        });

        await staff.save();

        natsWrapper.client.publish('staff:created', JSON.stringify(
            { ...staff, password: staff.otp! }
        ));

        res.status(201).send(staff);
    }


})

export { router as createStaffRouter };