class AppError extends Error {
  statusCode: number;
  error?: any;
  constructor(statuscode: number, message: string, stack?: "", error?: any) {
    super(message);
    this.statusCode = statuscode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    if (error) {
      this.error = error;
    }
  }
}

export default AppError;
