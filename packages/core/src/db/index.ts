import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

// create the connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle(pool);

export * as dbSchema from './schema';
