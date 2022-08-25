import express, { Request, Response, NextFunction } from 'express';
import { Organizer } from '../../models/org';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { Password } from '../../services/password';
import { natsWrapper } from '../../nats-wrapper';


const router = express.Router();

router.put('/api/auth/change-password', [
        body('email').
        isEmail().
        withMessage('Email must be valid'),
        body('password').
        trim().
        notEmpty().
        withMessage('Password is required')
    ], 
    
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, role, password, new_password } = req.body;
        let existingUser = await Organizer.findOne({ email })

        if (!existingUser) {
            throw new BadRequestError(`${role} 'doesn\'t exist'`)
        } 

        const passwordMatch = await Password.compare(existingUser.password, password)

        if (passwordMatch == false) {
            throw new BadRequestError('Invalid credentials')
        }

        const hashed = await Password.toHash(new_password)

        existingUser = await Organizer.findOneAndUpdate({ "email": email }, { 
            password: hashed, 
            is_verified: true 
        }, 
        { 
            new: true,
            runValidators: true 
        });
        res.status(201).send({ existingUser });


    }
)

export { router as changePasswordRouter }