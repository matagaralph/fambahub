import { provider } from '@/container';
import { ApiError } from '@/container/modules/httpRequest';
import { TOKENS } from '@/container/tokens';
import auxiliaryRoutes from '@/routes/auxiliary';
import demandRoutes from '@/routes/demand';
import { bindToHono } from '@circulo-ai/di';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { rateLimiter } from 'hono-rate-limiter';
import { requestId } from 'hono/request-id';
import { Time } from '@/utils/time';
import { XiorError } from 'xior';
import { error } from 'console';

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

// app.get('/hello', async (c) => {
//   return c.json({ message: 'Hello' });
// });

// showRoutes(app, {
//   verbose: true,
// });

export const GET = handle(app);
export const POST = handle(app);
