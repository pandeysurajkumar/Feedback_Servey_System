class ApiError extends Error {
  constructor(
    statuCode,
    message = 'Something went wrong',
    error = [],
    stack = ''
  ) {
    super(message);
    this.statusCode = statuCode || 500;
    this.message = message;
    this.data = null;
    this.success = false;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
