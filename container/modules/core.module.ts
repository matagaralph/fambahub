import { createModule } from '@circulo-ai/di';
import { TOKENS } from '../tokens';
import { db } from './db/drizzle';

export const coreModule = createModule();

coreModule.bind(TOKENS.DB).toHigherOrderFunction(
  () => {
    return db;
  },
  [],
  { scope: 'global' },
);

coreModule
  .bind(TOKENS.Redis)
  .toHigherOrderFunction(
    () => new Bun.RedisClient(Bun.env.REDISCLOUD_URL!),
    [],
    { scope: 'global' },
  );
