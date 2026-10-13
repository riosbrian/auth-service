import cors from 'cors';
import { envs } from '#src/config/envs.js';
import { ForbiddenError } from '#src/shared/errors/app-error.js';

export const corsGuard = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (envs.CORS_ORIGINS.includes(origin)) return callback(null, true);
    callback(new ForbiddenError(`Origin not allowed: ${origin}`));
  },
  credentials: true,
});
