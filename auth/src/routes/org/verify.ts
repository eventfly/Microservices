import express, { Request, Response, NextFunction } from 'express';
import { Organizer } from '../../models/org';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { Password } from '../../services/password';
import { natsWrapper } from '../../nats-wrapper';

const router = express.Router();

router.put('/api/auth/verify', [
    body('email').
    isEmail().
    withMessage('Email must be valid'),
    body('password').
    trim().
    notEmpty().
    withMessage('Password is required')], async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, new_password } = req.body;

    console.log(req.body)

    let existingUser = await Organizer.findOne({ email })


    if (!existingUser) {
        throw new BadRequestError('Organizer doesn\'t exist')
    } 

    if(existingUser.role == 'staff' && existingUser.is_verified == false){

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

        
        natsWrapper.client.publish('otp:verified', JSON.stringify(
            existingUser
        ), () => {
            console.log('Otp Verification published')
        })
        
        res.status(201).send({ existingUser });

    }

    else{
        throw new BadRequestError('Staff is already verified')
    }

})

export { router as verifyOrganizerRouter };