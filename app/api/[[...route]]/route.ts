import { provider } from '@/container';
import { ApiError } from '@/container/modules/httpRequest';
import { TOKENS } from '@/container/tokens';
import auxiliaryRoutes from '@/routes/auxiliary';
import demandRoutes from '@/routes/demand';
import { Time } from '@/utils/time';
import { bindToHono } from '@circulo-ai/di';
import { Hono } from 'hono';
import { setCookie } from 'hono/cookie';
import { rateLimiter } from 'hono-rate-limiter';
import { requestId } from 'hono/request-id';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

bindToHono(app as any, provider, TOKENS, { cache: true, strict: true });

app.use(requestId());
app.use(
  rateLimiter({
    limit: 500,
    windowMs: Time.minutes.toMilliseconds,
    keyGenerator: (c) =>
      c.req.header('x-api-key') ?? c.req.header('x-forwarded-for') ?? '',
  }),
);

app.onError((err, c) => {
  console.error(err);
  if (err instanceof ApiError) {
    return c.json(
      //@ts-expect-error
      { message: err.data.message as string, detail: err.data },
      (err.statusCode || 500) as any,
    );
  }

  if ('statusCode' in err && 'url' in err) {
    //@ts-expect-error
    return c.json({ detail: err.data }, (err.statusCode || 500) as any);
  }

  return c.json({ message: err }, 500);
});

app.route('/auxiliary', auxiliaryRoutes);
app.route('/demand', demandRoutes);

app.post('/preferences/currency', async (c) => {
  const { currency } = await c.req.json();
  if (!currency) return c.json({ message: 'Invalid currency' }, 400);

  setCookie(c, 'fhub-currency', currency, {
    path: '/',
    secure: true,
    domain: 'fambahub.com',
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'Strict',
  });

  return c.body(null, 204);
});
// showRoutes(app, {
//   verbose: true,
// });

export const GET = handle(app);
export const POST = handle(app);
