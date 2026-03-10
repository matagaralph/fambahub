import { usersTable } from '@/container/modules/db/schema';
import { TOKENS } from '@/container/tokens';
import { resolveFromContext } from '@circulo-ai/di';
import { Hono } from 'hono';

const router = new Hono();

router.get('/user', async (c) => {
  const db = await resolveFromContext(c as any, TOKENS.DB);
  const user = await db.insert(usersTable).values({
    email: 'matagaralph@gmail.com',
    name: 'Mataga Ralph',
    password: await Bun.password.hash('password123', { algorithm: 'bcrypt' }),
  });
  return c.json(user);
});

export default router;
