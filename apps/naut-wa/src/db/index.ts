import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from './schema';
import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Check if connection string exists
if (!process.env.POSTGRES_URL) {
  console.error("Missing POSTGRES_URL environment variable");
  process.exit(1);
}

export const db = drizzle(sql, { schema });