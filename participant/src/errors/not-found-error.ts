import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404

    constructor() {
        super("Route doesn't exists")
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors() {
        return [{ message: 'Not Found' }]
    }

}