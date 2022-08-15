import { Request, Response, NextFunction } from "express";
import { PermissionDeniedError } from "../errors/permission-denied-error";
import { RoleRestrictedError } from "../errors/role-restricted-error";


export const roleControl = (...permittedRoles: any) => {

    return (req: Request, res: Response, next: NextFunction) => {

        if(!permittedRoles.includes(req.currentUser!.role)){

            throw new RoleRestrictedError()
        }

        next();
    }
}

export const permissionControl = (...permittedPermissions: any) => {

    return (req: Request, res: Response, next: NextFunction) => {

        const matched = req.currentUser!.permissions!.filter((permission: any) => {

            if(!permittedPermissions.includes(permission)){
                return false
            }
            else{
                return true
            }
        
        });

        console.log("Checking permissions... Matched permissions: ", matched)

        if(matched.length == 0){
            throw new PermissionDeniedError()
        }

        next();
    }
}

