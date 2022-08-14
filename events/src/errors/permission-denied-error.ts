import { CustomError } from "./custom-error";

export class PermissionDeniedError extends CustomError {
    statusCode = 403;
    constructor() {
        super('Permission denied');
        Object.setPrototypeOf(this, PermissionDeniedError.prototype);
    }
    serializeErrors() {
        return [{ message: 'Permission denied' }];
    }
}