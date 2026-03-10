import { provider } from '@/container';
import { ApiError } from '@/container/modules/httpRequest';
import { TOKENS } from '@/container/tokens';
import auxiliaryRoutes from '@/routes/auxiliary';
import demandRoutes from '@/routes/demand';
import { bindToHono } from '@circulo-ai/di';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

bindToHono(app as any, provider, TOKENS, { cache: true, strict: true });

app.onError((err, c) => {
  console.error({ message: err.message, stack: err.stack });
  if (err instanceof ApiError) {
    return c.json(
      { message: err.message, data: err.data },
      (err.statusCode || 500) as any,
    );
  }

  return c.json({ message: 'INTERNAL SERVER ERROR' }, 500);
});

app.route('/auxiliary', auxiliaryRoutes);
app.route('/demand', demandRoutes);

export const GET = handle(app);
export const POST = handle(app);
