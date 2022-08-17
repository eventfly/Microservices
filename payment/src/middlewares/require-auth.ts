import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser || !req.currentUser.id) {
        throw new NotAuthorizedError()
    }
    next();
}