import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { SessionExpiredError } from "../errors/session-expired-error";

interface UserPayload {
    id: string;
    email: string;
    name?: string;
    dob?: string;
    gender?: string;
    role?: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}


export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.headers.authorization) {
        return next()
    }

    try {
        const payload = jwt.verify(req.headers.authorization, process.env.JWT_KEY!) as UserPayload
        req.currentUser = payload;

        if (!req.currentUser) {
            throw new NotAuthorizedError()
        }

    } catch (err) {
        console.log(err)
        throw new SessionExpiredError();
    }

    next()
}