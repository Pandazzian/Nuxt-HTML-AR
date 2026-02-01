import { readBody, createError } from 'h3';
import { getRedisClient } from '@/server/utils/redis';

const sanitize = (value: unknown, fallback: string, max = 24) => {
  if (typeof value !== 'string') return fallback;
  const cleaned = value.trim().slice(0, max);
  return cleaned || fallback;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = sanitize(body?.id, '');
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing id' });
  }

  const name = sanitize(body?.name, 'Guest');
  const country = sanitize(body?.country, 'Unknown');
  const exp = Math.max(0, Number(body?.exp || 0));
  const avatarIndex = Number.isFinite(Number(body?.avatarIndex)) ? Number(body.avatarIndex) : 0;

  const redis = await getRedisClient();

  await redis.zAdd('leaderboard:exp', {
    score: exp,
    value: id,
  });
  await redis.set(
    `leaderboard:profile:${id}`,
    JSON.stringify({
      name,
      country,
      avatarIndex,
      updatedAt: Date.now(),
    })
  );

  return { ok: true };
});
