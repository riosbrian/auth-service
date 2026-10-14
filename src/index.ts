import { envs } from '#src/config/envs.js';
import { connectToMongodb, disconnectFromMongodb } from '#src/data/mongodb/mongodb.connection.js';
import server from '#src/server/server.js';
import logger from '#src/shared/lib/pino/logger.js';

let isShuttingDown = false;
let shutdownExitCode = 0;

async function shutdown(reason: string, exitCode = 0): Promise<void> {
  shutdownExitCode = Math.max(shutdownExitCode, exitCode);

  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info({ reason }, 'Shutting down application');
  const timeout = setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, envs.SHUTDOWN_TIMEOUT_MS);
  timeout.unref();

  try {
    await server.stop();
    await disconnectFromMongodb();
  } catch (error) {
    shutdownExitCode = 1;
    logger.error({ err: error }, 'Failed to shut down application cleanly');
  } finally {
    clearTimeout(timeout);
    process.exit(shutdownExitCode);
  }
}

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('unhandledRejection', (reason) => {
  logger.fatal({ err: reason }, 'Unhandled promise rejection');
  void shutdown('unhandledRejection', 1);
});
process.on('uncaughtException', (error) => {
  logger.fatal({ err: error }, 'Uncaught exception');
  void shutdown('uncaughtException', 1);
});
server.onError((error) => {
  logger.fatal({ err: error }, 'HTTP server error');
  void shutdown('httpServerError', 1);
});

try {
  await connectToMongodb();
  server.start();
} catch (error) {
  logger.fatal({ err: error }, 'Failed to start application');
  await shutdown('startupFailure', 1);
}
