import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { natsWrapper } from '../nats-wrapper';
import { BadRequestError } from '../errors/bad-request-error';
import { Organizer } from '../models/organizer';
// import { OrgCreatedPublisher } from '../events/publishers/org-created-publisher';

const router = express.Router();

router.post('/api/org', [
    body('email').
        isEmail().
        withMessage('Email must be valid'),
    body('password').
        trim().
        isLength({ min: 4, max: 20 }).
        withMessage('Password must be between 4 and 20 characters')
], validateRequest, async (req: Request, res: Response) => {
    const { email, password, name, role } = req.body

    const existingUser = await Organizer.findOne({ email })
    if (existingUser) {
        throw new BadRequestError(
            'Email in use'
        )
    } else {
        const user = Organizer.build({ email, password, name, role })

        await user.save()

        // Publish an event to the NATS Streaming server

        natsWrapper.client.publish('org:created', JSON.stringify(
            {
                email: user.email,
                name: user.name,
                password: user.password,
                role: user.role,
                ref_id: user.id
            }
        ), () => {
            console.log('Event published')
        })



        //Generate JWT Token
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            ref_id: user.id
        }, process.env.JWT_KEY!)

        //Store it on session object (in the cookie)

        req.session = {
            jwt: userJwt
        }

        res.status(201).send({ user, token: userJwt });
    }
})

export { router as orgSignupRouter }