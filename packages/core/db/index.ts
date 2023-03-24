import { drizzle } from 'drizzle-orm/planetscale-serverless';
import {fetch} from 'undici';

import { connect } from '@planetscale/database';

// create the connection
const connection = connect({
  fetch,
  url: process.env['DATABASE_URL']
})

export const db = drizzle(connection);
