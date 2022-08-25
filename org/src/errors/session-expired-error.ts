import { CustomError } from "./custom-error";

export class SessionExpiredError extends CustomError {
    statusCode = 440;
    constructor() {
        super('Not authorized');
        Object.setPrototypeOf(this, SessionExpiredError.prototype);
    }
    serializeErrors() {
        return [{ message: 'Session Expired' }];
    }
}