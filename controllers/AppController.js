/**
 * Controllers
 */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

export const getStatus = () => {
  const redis = redisClient;
  const mongodb = dbClient;

  return { redis: redis.isAlive(), mongo: mongodb.isAlive() };
};

export const getStats = async () => {
  const users = await dbClient.nbUsers();
  const files = await dbClient.nbFiles();

  return { users, files };
};
