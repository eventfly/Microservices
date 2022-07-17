import express, { Request, Response } from 'express'
import { json } from 'body-parser'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'

import { validateRequest } from '../../middlewares/validate-request'

import { participant } from '../../models/participant'
import { BadRequestError } from '../../errors/bad-request-error'

const router = express.Router()

router.post('/api/auth/users/signup', [
    body('email').
        isEmail().
        withMessage('Email must be valid'),
    body('password').
        trim().
        isLength({ min: 4, max: 20 }).
        withMessage('Password must be between 4 and 20 characters')
],
    validateRequest,
    async (req: Request, res: Response) => {


        const { email, password, gender, dob, name } = req.body

        const existingUser = await participant.findOne({ email })
        if (existingUser) {
            throw new BadRequestError(
                'Email in use'
            )
        } else {
            const user = participant.build({ email, password, name, dob, gender })
            await user.save()

            //Generate JWT
            const userJwt = jwt.sign({
                id: user.id,
                email: user.email,
                name: user.name,
                dob: user.dob,
                gender: user.gender
            }, process.env.JWT_KEY!)

            //Store it on session object

            req.session = {
                jwt: userJwt
            }

            res.status(201).send({ user })
        }

    })

export { router as signupRouter }