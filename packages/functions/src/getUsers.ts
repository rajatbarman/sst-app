import { ApiHandler } from "sst/node/api";
import {db} from '@sst-org-app/core/db'
import { Time } from "@sst-org-app/core/time";
import { users } from '@sst-org-app/core/db/schema';

export const handler = ApiHandler(async (_evt) => {
  const allUsers = await db.select().from(users)
  return {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      users: allUsers
    })
  };
});
