import { redisConfig } from 'config';
import ioredis, { Redis } from 'ioredis';

class RedisService {
  private static instance: Redis | null = null;

  /**
   * Get ioredis instance.
   */
  static getInstance(): Redis {
    if (!this.instance) {
      this.instance = new ioredis(redisConfig);
    }

    return this.instance;
  }
}

export default RedisService;
