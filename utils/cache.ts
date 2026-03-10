import { provider } from '@/container';
import { TOKENS } from '@/container/tokens';

const redis = provider.resolve(TOKENS.Redis);

export async function getOrSet<T>(
  key: string,
  ttl: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const fresh = await fetcher();
  await redis.set(key, JSON.stringify(fresh), 'EX', ttl);
  return fresh;
}
