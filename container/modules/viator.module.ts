import { createModule } from '@circulo-ai/di';
import { TOKENS } from '../tokens';
import { ApiClient } from '@/container/modules/httpRequest';

export const viatorModule = createModule();

viatorModule.bind(TOKENS.Viator).toHigherOrderFunction(
  () =>
    new ApiClient(Bun.env.VIATOR_API_URL!, {
      timeout: 30_000,
      headers: {
        'exp-api-key': Bun.env.VIATOR_API_KEY ?? '',
        Accept: 'application/json;version=2.0',
        'Accept-Language': 'en',
      },
      retryTimes: 0,
    }),
  [],
  { scope: 'global' },
);
