import { createClient } from 'redis';

type RedisClient = ReturnType<typeof createClient>;

const globalForRedis = globalThis as { __redisClient?: RedisClient };

const createRedisClient = () => {
  const url = process.env.REDIS_URL;
  if (!url) {
    throw new Error('REDIS_URL is not set');
  }
  const parsed = new URL(url);
  const useTls = parsed.protocol === 'rediss:';
  const client = createClient({
    url,
    socket: {
      tls: useTls,
      servername: parsed.hostname,
      family: 4,
    },
  });
  client.on('error', (err) => {
    console.error('Redis Client Error', err);
  });
  return client;
};

export const getRedisClient = async () => {
  if (!globalForRedis.__redisClient) {
    globalForRedis.__redisClient = createRedisClient();
  }

  const client = globalForRedis.__redisClient;
  if (!client.isOpen) {
    await client.connect();
  }

  return client;
};
