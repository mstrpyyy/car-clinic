import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'dotenv'

if (process.env.NODE_ENV === 'development') {
  // console.log('running development');
  config ({ path: ".env.local"})
} 

const sql = neon(process.env.DATABASE_URL!);

// logger
// const db = drizzle(sql, { logger: true })
const db = drizzle({ client: sql });

export { db }