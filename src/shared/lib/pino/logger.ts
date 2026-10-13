import pino from 'pino';
import { envs } from '#src/config/envs.js';

const logger = pino({
  level: envs.NODE_ENV === 'test' ? 'silent' : envs.LOG_LEVEL,
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', 'req.headers["set-cookie"]'],
    censor: '[REDACTED]',
  },
  ...(envs.NODE_ENV === 'development' && {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'SYS:HH:MM:ss' },
    },
  }),
});

export default logger;
