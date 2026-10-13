export class AppError extends Error {
  public readonly status: string;

  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly cause?: unknown,
    public readonly isOperational: boolean = true,
  ) {
    super(message);
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InternalServerError extends AppError {
  constructor(cause: unknown) {
    super('Internal Server Error', 500, cause, false);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}
