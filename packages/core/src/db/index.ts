import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise'

// create the connection
const connection = await mysql.createPool({
  uri: process.env.DATABASE_URL
});


export const db = drizzle(connection);

export * as dbSchema from './schema'