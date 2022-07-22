import { redisConfig } from 'config';
import ioredis from 'ioredis';

class RedisService {
  private static instance: ioredis.Redis | null = null;

  /**
   * Get ioredis instance.
   */
  static getInstance(): ioredis.Redis {
    if (!this.instance) {
      this.instance = new ioredis(redisConfig);
    }

    return this.instance;
  }
}

export default RedisService;
