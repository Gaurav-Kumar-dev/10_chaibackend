class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack
  ) {
    super(message);
    if (typeof statusCode !== 'number' || statusCode < 100 || statusCode > 599) {
      throw new Error('Invalid status code');
    }
    this.statusCode = statusCode;
    this.responseData = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };