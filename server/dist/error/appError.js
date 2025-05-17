"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(statuscode, message, stack, error) {
        super(message);
        this.statusCode = statuscode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
        if (error) {
            this.error = error;
        }
    }
}
exports.default = AppError;
