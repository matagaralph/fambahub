import { createToken } from '@circulo-ai/di';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import type { RedisClient } from 'bun';
import { ApiClient } from '@/container/modules/httpRequest';

export const TOKENS = {
  DB: createToken<LibSQLDatabase>('Drizzle'),
  Redis: createToken<RedisClient>('Redis'),
  Viator: createToken<ApiClient>('Viator'),
} as const;
