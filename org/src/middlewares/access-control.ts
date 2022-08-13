import { Request, Response, NextFunction } from "express";
import { PermissionDeniedError } from "../errors/permission-denied-error";


export const accessControl = (...permittedRoles: any) => {

    return (req: Request, res: Response, next: NextFunction) => {

        if(!permittedRoles.includes(req.currentUser!.role)){

            throw new PermissionDeniedError()
        }

        // if(permittedRoles.includes('Staff') && 
        //     (req.currentUser!.role == 'Organizer' || req.currentUser!.role == 'Manager')){

        //         throw new PermissionDeniedError()
        // }


        next();
    }
}

