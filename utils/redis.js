/**
 * Redis Util Class
 * Redis Client
 */
import { createClient } from 'redis';
import { promisify } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isConnect = true;
    this.client.on('error', (err) => {
      console.log('Redis client failed to connect:', err.message || err.toString());
      this.isConnect = false;
    });
    this.client.on('connect', () => {
      this.isConnect = true;
    });
  }

  isAlive() {
    return this.isConnect;
  }

  async set(key, value, duration) {
    const setAsync = promisify(this.client.SETEX).bind(this.client);
    return setAsync(key, duration, value);
  }

  async get(key) {
    const getAsync = promisify(this.client.GET).bind(this.client);
    return getAsync(key);
  }

  async del(key) {
    const delAsync = promisify(this.client.DEL).bind(this.client);
    return delAsync(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
