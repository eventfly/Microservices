import { CustomError } from "./custom-error";

export class RoleRestrictedError extends CustomError {
    statusCode = 403;
    constructor() {
        super('Role is restricted');
        Object.setPrototypeOf(this, RoleRestrictedError.prototype);
    }
    serializeErrors() {
        return [{ message: 'Role is restricted' }];
    }
}