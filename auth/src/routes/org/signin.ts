import express, { Request, Response } from 'express'
import { json } from 'body-parser'
import { body } from 'express-validator'
import { Organizer } from '../../models/org'
import { validateRequest } from '../../middlewares/validate-request'
import { BadRequestError } from '../../errors/bad-request-error'
import { Password } from '../../services/password'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.post('/api/auth/org/signin',
    [
        body('email').
            isEmail().
            withMessage('Email must be valid'),
        body('password').
            trim().
            notEmpty().
            withMessage('Password is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body

        const existingUser = await Organizer.findOne({ email })


        if (!existingUser) {
            throw new BadRequestError('Organizer or Staff doesn\'t exist')
        } 


        const passwordMatch = await Password.compare(existingUser.password, password)

        if (passwordMatch == false) {
            throw new BadRequestError('Invalid credentials')
        }

        //Generate JWT
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
            ref_id: existingUser.ref_id
        }, process.env.JWT_KEY!, {
            expiresIn: 60*100
        })

        //Store it on session object

        req.session = {
            jwt: userJwt
        }

        res.status(200).send({ existingUser, token: userJwt })


    })

export { router as OrgSigninRouter }