import Redis from 'ioredis';
import { config } from './env.js';

class InMemoryRedisMock {
  private store = new Map<string, any>();

  async connect() {
    return;
  }

  on(event: string, callback: (...args: any[]) => void) {
    if (event === 'connect') {
      setTimeout(() => callback(), 0);
    }
    return this;
  }

  async set(key: string, value: string, mode?: string, duration?: number) {
    this.store.set(key, value);
    return 'OK';
  }

  async get(key: string) {
    return this.store.get(key) || null;
  }

  async del(...keys: string[]) {
    let count = 0;
    for (const key of keys) {
      if (this.store.delete(key)) {
        count++;
      }
    }
    return count;
  }

  async keys(pattern: string) {
    const regexStr = pattern.replace(/\*/g, '.*');
    const regex = new RegExp(`^${regexStr}$`);
    const results: string[] = [];
    for (const key of this.store.keys()) {
      if (regex.test(key)) {
        results.push(key);
      }
    }
    return results;
  }

  async hset(key: string, field: string, value: string) {
    let hash = this.store.get(key);
    if (!hash || !(hash instanceof Map)) {
      hash = new Map<string, string>();
      this.store.set(key, hash);
    }
    hash.set(field, value);
    return 1;
  }

  async hget(key: string, field: string) {
    const hash = this.store.get(key);
    if (!hash || !(hash instanceof Map)) return null;
    return hash.get(field) || null;
  }

  async hgetall(key: string) {
    const hash = this.store.get(key);
    if (!hash || !(hash instanceof Map)) return {};
    const obj: Record<string, string> = {};
    for (const [k, v] of hash.entries()) {
      obj[k] = v;
    }
    return obj;
  }

  async hdel(key: string, field: string) {
    const hash = this.store.get(key);
    if (!hash || !(hash instanceof Map)) return 0;
    const deleted = hash.delete(field);
    return deleted ? 1 : 0;
  }
}

let redisClient: Redis | null = null;

export async function connectRedis(): Promise<Redis> {
  if (redisClient) return redisClient;
  
  const client = new Redis(config.REDIS_URL, {
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    maxRetriesPerRequest: 1, // Fail fast to fall back to in-memory mock
    lazyConnect: true,
  });

  client.on('connect', () => console.log('✅ Redis connected'));
  client.on('error', (err) => {
    if (redisClient instanceof InMemoryRedisMock) return;
    console.error('Redis error:', err.message || err);
  });
  
  try {
    await client.connect();
    redisClient = client;
    return redisClient;
  } catch (err) {
    console.warn('⚠️ Could not connect to Redis. Falling back to In-Memory Redis Mock.');
    redisClient = new InMemoryRedisMock() as unknown as Redis;
    return redisClient;
  }
}

export function getRedis(): Redis {
  if (!redisClient) throw new Error('Redis not connected. Call connectRedis() first.');
  return redisClient;
}

export async function setCache(key: string, value: unknown, ttlSeconds = 3600): Promise<void> {
  const client = getRedis();
  await client.set(key, JSON.stringify(value), 'EX', ttlSeconds);
}

export async function getCache<T>(key: string): Promise<T | null> {
  const client = getRedis();
  const data = await client.get(key);
  if (!data) return null;
  return JSON.parse(data) as T;
}

export async function deleteCache(key: string): Promise<void> {
  const client = getRedis();
  await client.del(key);
}

export async function deleteCachePattern(pattern: string): Promise<void> {
  const client = getRedis();
  const keys = await client.keys(pattern);
  if (keys.length > 0) {
    await client.del(...keys);
  }
}

