import express, { Request, Response, NextFunction } from 'express';
import { Organizer } from '../../models/org';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { Password } from '../../services/password';

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

    let existingUser = await Organizer.findOne({ email })


    if (!existingUser) {
        throw new BadRequestError('Organizer doesn\'t exist')
    } 


    const passwordMatch = await Password.compare(existingUser.password, password)

    if (passwordMatch == false) {
        throw new BadRequestError('Invalid credentials')
    }

    existingUser = await Organizer.findOneAndUpdate({ email }, { password: new_password, is_verified: true }, { new: true });

    res.status(201).send({ existingUser });

})

export { router as verifyOrganizerRouter };