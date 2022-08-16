import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { natsWrapper } from '../nats-wrapper';
import { currentUser } from '../middlewares/current-user';
import { validateRequest } from '../middlewares/validate-request';
import { Staff } from '../models/staff';
import { requireAuth } from '../middlewares/require-auth';
import { errorHandler } from '../middlewares/error-handler';
import { ObjectId } from 'bson';
import { sendMail } from '../services/mail';
import { roleControl } from '../middlewares/access-control';
var URI = require("uri-js");

const router = express.Router();

router.post('/api/org/staff', [
    body('name').
        isLength({ min: 5, max: 50 }).
        withMessage('Name must be between 5 and 50 characters'),
    body('email').
        isEmail().
        withMessage('Email must be a valid email'),
    // body('role').
    //     isIn(['organizer', 'staff']).
    //     withMessage('Role must be either organizer or staff'),
    body('events').
        isArray().
        withMessage('Events must be an array'),

    ], 
    
    validateRequest, 
    currentUser, 
    requireAuth,
    roleControl('Organizer', 'Manager'), 
    errorHandler, 
    
    async (req: Request, res: Response) => {
    
        let { name, email, role, permissions } = req.body;

        const existingUser = await Staff.findOne({ email });

        if (existingUser) {
            throw new Error('Email in use');
        }

        else {
            // events = events.map((eventId: string) => {
            //     return {eventId: new ObjectId(eventId)}
            // })

            const staff = await Staff.build({
                name,
                email,
                role,
                permissions,
                organizer: req.currentUser!.ref_id,
                // events
            });

            await staff.save();

            console.log("Staff created. login with otp: ", staff!.otp)

            natsWrapper.client.publish('staff:created', JSON.stringify(
                { 
                    name: staff.name,
                    email: staff.email, 
                    role: staff.role,
                    ref_id: staff.id, 
                    password: staff.otp!,
                    permissions: staff.permissions!
                    // is_verified: staff.is_verified,
                    // events: staff.events
                }
            ));

            // natsWrapper.client.publish('staff:assigned', JSON.stringify(
            //     { 
            //         name: staff.name,
            //         email: staff.email, 
            //         role: staff.role,
            //         ref_id: staff.id, 
            //         password: staff.otp!,
            //         // is_verified: staff.is_verified,
            //         events: staff.events
            //     }
            // ));

            const url = encodeURIComponent(`http://localhost:3005/login?email=${staff.email}&password=${staff.otp}`)
            console.log(url);

            sendMail({
                from: 'eventfly@buetcsefest2022.com',
                to: staff.email,
                subject: 'Welcome to Eventfly',
                html: `<h1>Welcome to Eventfly!</h1> <p>Your account has been created. Please use the following email and password to login: Email: ${staff.email}, Password: ${staff.otp}</p> <p> Please click on the following link to verify your account: <a href=${url}>Click Here</a></p>`
            });

            res.status(201).send(staff);
        }


})

export { router as createStaffRouter };