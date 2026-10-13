import server from '#src/server/server.js';
import logger from '#src/shared/lib/pino/logger.js';

(() => {
  server.start();
  process.on('SIGTERM', () => server.shutdown('SIGTERM'));
  process.on('SIGINT', () => server.shutdown('SIGINT'));
  process.on('unhandledRejection', (reason) => {
    logger.fatal({ err: reason }, 'Unhandled promise rejection');
    server.shutdown('unhandledRejection', 1);
  });
  process.on('uncaughtException', (err) => {
    logger.fatal({ err }, 'Uncaught exception');
    server.shutdown('uncaughtException', 1);
  });
})();
