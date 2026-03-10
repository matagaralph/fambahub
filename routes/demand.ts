import { provider } from '@/container';
import { TOKENS } from '@/container/tokens';
import { getOrSet } from '@/utils/cache';
import { Hono } from 'hono';

const router = new Hono();
const viator = provider.resolve(TOKENS.Viator);
const TTL = 60 * 60 * 24 * 7;

router.get('/products/tags', async (c) => {
  const resp = await getOrSet('api:tags', TTL, () => {
    return viator.get({ path: ['products', 'tags'] });
  });
  return c.json(resp);
});

router.get('/products/:productCode', async (c) => {
  const productCode = c.req.param('productCode');
  const resp = await viator.get({ path: ['products', productCode] });
  return c.json(resp);
});

router.post('/products/search', async (c) => {
  const resp = await viator.post({
    path: ['products', 'search'],
    body: await c.req.json(),
  });
  return c.json(resp);
});

router.get('/attractions/:attractionId', async (c) => {
  const attractionId = c.req.param('attractionId');
  const resp = await viator.get({ path: ['attractions', attractionId] });
  return c.json(resp);
});

router.post('/attractions/search', async (c) => {
  const resp = await viator.post({
    path: ['attractions', 'search'],
    body: await c.req.json(),
  });
  return c.json(resp);
});

router.get('/availability/schedules/:productCode', async (c) => {
  const productCode = c.req.param('productCode');
  const resp = await viator.get({
    path: ['availability', 'schedules', productCode],
  });
  return c.json(resp);
});

export default router;
