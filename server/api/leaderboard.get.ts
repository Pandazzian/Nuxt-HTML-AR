import { getQuery } from 'h3';
import { getRedisClient } from '@/server/utils/redis';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const limit = Math.min(200, Math.max(1, Number(query.limit || 100)));

  const redis = await getRedisClient();

  const raw = await redis.zRangeWithScores('leaderboard:exp', 0, limit - 1, {
    REV: true,
  });

  const normalizedEntries = (raw || []).map((entry, index) => ({
    id: String(entry.value),
    exp: Number(entry.score ?? 0),
    place: index + 1,
  }));

  const profileKeys = normalizedEntries
    .filter((entry) => entry.id)
    .map((entry) => `leaderboard:profile:${entry.id}`);
  const profilesRaw = profileKeys.length ? await redis.mGet(profileKeys) : [];

  const profiles = profilesRaw.map((profile) => {
    if (!profile) return null;
    try {
      return JSON.parse(profile);
    } catch {
      return null;
    }
  });

  return normalizedEntries.map((entry, index) => {
    const profile = profiles[index] || {};
    return {
      place: entry.place,
      id: entry.id,
      exp: Number(entry.exp ?? 0),
      name: profile.name || 'Guest',
      country: profile.country || 'Unknown',
      avatarIndex: profile.avatarIndex ?? 0,
    };
  });
});
