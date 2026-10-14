import mongoose from 'mongoose';
import { envs } from '#src/config/envs.js';
import logger from '#src/shared/lib/pino/logger.js';

export async function connectToMongodb() {
  await mongoose.connect(envs.MONGO_URI, { dbName: envs.DB_NAME });
  logger.info('Connection to MongoDB established');
}

export async function disconnectFromMongodb() {
  await mongoose.disconnect();
  logger.info('Connection to MongoDB closed');
}
