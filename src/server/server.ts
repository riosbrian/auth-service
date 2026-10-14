import http from 'node:http';
import app from '#src/app/app.js';
import { envs } from '#src/config/envs.js';
import logger from '#src/shared/lib/pino/logger.js';

const server = http.createServer(app);

function start(): void {
  server.listen(envs.PORT, () => {
    logger.info(`Server running on http://localhost:${envs.PORT} - [${envs.NODE_ENV}]`);
  });
}

function onError(listener: (error: Error) => void): void {
  server.on('error', listener);
}

async function stop(): Promise<void> {
  if (!server.listening) return;

  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
  logger.info('HTTP server closed');
}

export default {
  onError,
  start,
  stop,
};
