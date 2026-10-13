import rateLimit from 'express-rate-limit';
import { envs } from '#src/config/envs.js';

export const rateLimiter = rateLimit({
  windowMs: envs.RATE_LIMIT_WINDOW_MS,
  max: envs.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Too many requests, try again later',
  },
});
