import express, { Request, Response } from 'express'
import { json } from 'body-parser'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'

import { validateRequest } from '../../middlewares/validate-request'
import { BadRequestError } from '../../errors/bad-request-error'
import { Organizer } from '../../models/org'

const router = express.Router()

router.post('/api/auth/org/signup', [
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


        const { email, password, name, role, id } = req.body

        const existingUser = await Organizer.findOne({ email })
        if (existingUser) {
            throw new BadRequestError(
                'Email in use'
            )
        } else {
            const user = Organizer.build({ email, password, name, role, ref_id: id})
            await user.save()

            //Generate JWT
            const userJwt = jwt.sign({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }, process.env.JWT_KEY!)

            //Store it on session object

            req.session = {
                jwt: userJwt
            }

            res.status(201).send({ user })
        }

    })

export { router as OrgSignupRouter }