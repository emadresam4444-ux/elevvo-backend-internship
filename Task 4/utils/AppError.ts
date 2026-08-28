class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  statusText: string;
  constructor(message: string, statusCode: number, statusText: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.statusText = statusText;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default AppError;
