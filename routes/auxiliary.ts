import { provider } from '@/container';
import { TOKENS } from '@/container/tokens';
import { getOrSet } from '@/utils/cache';
import { Hono } from 'hono';

const router = new Hono();
const viator = provider.resolve(TOKENS.Viator);
const TTL = 60 * 60 * 24 * 7;

router.get('/destinations', async (c) => {
  const destinations = await getOrSet('api:destinations', TTL, () => {
    return viator
      .get<{ destinations: [] }>({ path: ['destinations'] })
      .then((res) => res.destinations);
  });

  return c.json({ destinations });
});

router.post('/locations/bulk', async (c) => {
  const resp = await viator.post({
    path: ['locations', 'bulk'],
    body: await c.req.json(),
  });
  return c.json(resp);
});

router.get('/bookings/modified-since', async (c) => {
  const count = Number(c.req.query('count') ?? 5000);
  const resp = await viator.get({
    path: ['bookings', 'modified-since'],
    params: { count },
  });
  return c.json(resp);
});

router.post('/search/freetext', async (c) => {
  const resp = await viator.post({
    path: ['search', 'freetext'],
    body: await c.req.json(),
  });
  return c.json(resp);
});

router.post('/exchange-rates', async (c) => {
  const resp = await viator.post({
    path: ['exchange-rates'],
    body: await c.req.json(),
  });
  return c.json(resp);
});

export default router;
