/**
 * Controllers 
 */
import { redisClient } from '../utils/redis.js';
import { dbClient } from '../utils/db.js';

const getStatus = async () => {
	const redis = new redisClient();

	return await redis.isAlive();
}

const getStats = async () => {
	const mongodb = new dbClient();
	return await mongodb.isAlive();
}

module.exports = {
	getStatus,
	getStats
}
