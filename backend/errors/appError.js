class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? `FAILED` : 'ERROR';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  static keyError(message) {
    return new AppError(400, message);
  }

  static valueOfKeyError(message) {
    return new AppError(400, message);
  }

  static invalidError(message) {
    return new AppError(403, message);
  }

  static checkPolicyAgreeError(message) {
    return new AppError(403, message);
  }

  static checkAuth(message) {
    return new AppError(403, message);
  }

  static checkJWTAuth(message) {
    return new AppError(403, message);
  }

  static notFoundError(message) {
    return new AppError(404, message);
  }

  static duplicatedError(message) {
    return new AppError(409, message);
  }
}

module.exports = AppError;
