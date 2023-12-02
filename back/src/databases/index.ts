import { DB_HOST, DB_PORT, DB_DATABASE, REDIS_URL } from '@config';
import IORedis from 'ioredis';

const dbHost = DB_HOST || '127.0.0.1';
const dbPort = DB_PORT || '27017';
const dbDatabase = DB_DATABASE || 'beedeez-exercice-test';

export const dbConnection = `mongodb://${dbHost}:${dbPort}/${dbDatabase}`;

export const getRedisClient = () => {
  return new IORedis(REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });
};
