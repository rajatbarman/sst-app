import { ApiHandler } from "sst/node/api";
import {db} from '../../core/db/index'
import { users } from '../../core/db/schema';

export const handler = ApiHandler(async (_evt) => {
  const body = JSON.parse(String(_evt.body))
  const user = {
    fullName: body.name || null,
    email: body.email || null
  }
  let resp = null
  try  {
    resp = {
      userId: Number((await db.insert(users).values(user)).insertId)
    }
  } catch (e: any) {
    resp = {
      error: e.message
    }
    console.log('Error while inserting this user', e)
  }


  return {
    headers: { "Content-Type": "application/json" },
    statusCode: resp.userId ? 200 : 500,
    body: JSON.stringify(resp)
  };
});
