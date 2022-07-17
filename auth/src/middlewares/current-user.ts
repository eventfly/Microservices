import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { NotAuthorizedError } from "../errors/not-authorized-error";

interface UserPayload {
    id: string;
    email: string;
    name?: string;
    dob?: string;
    gender?: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}


export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next()
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
        req.currentUser = payload
        console.log('payload ', payload)
        console.log('req.currentUser = ', req.currentUser)

        if (!req.currentUser) {
            throw new NotAuthorizedError()
        }

    } catch (err) {
        console.log(err)
        res.send({ currentUser: null })
    }

    next()
}