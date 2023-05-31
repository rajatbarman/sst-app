import { ApiHandler } from 'sst/node/api';
import { db } from '@core/db';
import { users } from '@core/db/schema';

export const handler = ApiHandler(async (_evt) => {
  const allUsers = await db.select().from(users);
  return {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      users: allUsers,
    }),
  };
});
