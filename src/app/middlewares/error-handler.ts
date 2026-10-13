import type { ErrorRequestHandler } from 'express';
import { envs } from '#src/config/envs.js';
import { AppError, InternalServerError } from '#src/shared/errors/app-error.js';

const hasStatusCode = (err: unknown): err is { statusCode: number } =>
  typeof err === 'object' &&
  err !== null &&
  typeof (err as { statusCode?: unknown }).statusCode === 'number';

const normalize = (err: unknown): AppError => {
  if (err instanceof AppError) return err;
  if (hasStatusCode(err) && err.statusCode >= 400 && err.statusCode < 500) {
    const message = err instanceof Error ? err.message : 'Invalid request';
    return new AppError(message, err.statusCode, err);
  }
  return new InternalServerError(err);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (res.headersSent) return _next(err);

  const appError = normalize(err);
  const isDevelopment = envs.NODE_ENV === 'development';

  res.status(appError.statusCode).json({
    status: appError.status,
    message: appError.message,
    ...(isDevelopment && appError.cause !== undefined && { cause: appError.cause }),
  });
};
