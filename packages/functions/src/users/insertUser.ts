import { ApiHandler } from "sst/node/api";
import {db} from '@core/db'
import { users } from '@core/db/schema';

export const handler = ApiHandler(async (_evt) => {
  const body = JSON.parse(String(_evt.body))
  const user = {
    fullName: body.name || null,
    email: body.email || null
  }
  let resp = null
  try  {
    const userId = (await db.insert(users).values(user)).insertId
    resp = {
      error: false,
      message: 'User inserted successfully',
      data: {
        userId: Number(userId),
      }
    }
  } catch (e: any) {
    resp = {
      error: e.message
    }
    console.log('Error while inserting this user', e)
  }


  return {
    headers: { "Content-Type": "application/json" },
    statusCode: resp.error ? 500 : 200,
    body: JSON.stringify(resp)
  };
});
