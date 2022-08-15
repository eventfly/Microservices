import express, { Request, Response } from 'express';
import { Participant } from '../models/participant';
import jwt from 'jsonwebtoken'
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/participant', [
    body('email').
        isEmail().
        withMessage('Email must be valid'),
    body('password').
        trim().
        isLength({ min: 4, max: 20 }).
        withMessage('Password must be between 4 and 20 characters'),
    body('name').
        trim().
        isLength({ min: 4, max: 20 }).
        withMessage('Name must be between 4 and 20 characters')
], async (req: Request, res: Response) => {
    const { email, password, gender, dob, name, avatar } = req.body

    const existingUser = await Participant.findOne({ email })
    if (existingUser) {
        throw new BadRequestError(
            'Email in use'
        )
    } else {
        const user = new Participant({ email, password, name, dateOfBirth: dob, avatar, gender});

        await user.save();

        console.log(user);

        //Generate JWT
        const userJwt = jwt.sign({
            id: user._id,
            email: user.email,
            name: user.name,
            dob: user.dateOfBirth,
            gender: user.gender
        }, process.env.JWT_KEY!);
        
        natsWrapper.client.publish('participant:created', JSON.stringify({
            _id: user._id,
            email: user.email,
            name: user.name,
            dob: user.dateOfBirth,
            gender: user.gender,
            password: user.password
        }));


        res.status(201).send({ user, token: userJwt });
    }
});

export { router as signupRouter };