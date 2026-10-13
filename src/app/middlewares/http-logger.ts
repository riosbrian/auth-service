import { randomUUID } from 'node:crypto';
import { pinoHttp } from 'pino-http';
import logger from '#src/shared/lib/pino/logger.js';

const REQUEST_ID_HEADER = 'x-request-id';
const VALID_ID = /^[\w-]{1,64}$/;

export const httpLogger = pinoHttp({
  logger,
  genReqId: (req, res) => {
    const incoming = req.headers[REQUEST_ID_HEADER];
    const id = typeof incoming === 'string' && VALID_ID.test(incoming) ? incoming : randomUUID();
    res.setHeader(REQUEST_ID_HEADER, id);
    return id;
  },
  customLogLevel: (_req, res, err) => {
    if (err || res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  autoLogging: {
    ignore: (req) => req.url?.split('?')[0] === '/health',
  },
});
