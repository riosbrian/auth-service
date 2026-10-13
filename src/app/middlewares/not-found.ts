import type { RequestHandler } from 'express';
import { NotFoundError } from '#src/shared/errors/app-error.js';

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.path} not found`));
};
