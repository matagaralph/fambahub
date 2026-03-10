import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { ulid } from 'ulid';

export const usersTable = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => ulid().toLowerCase()),
  name: text('name'),
  email: text('email').unique(),
  password: text('password'),
  emailVerified: integer('email_verified', { mode: 'timestamp_ms' }),
  image: text('image'),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
