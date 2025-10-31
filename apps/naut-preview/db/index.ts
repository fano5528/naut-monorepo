import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from '@naut/schemas';
import { sql } from '@vercel/postgres';

export const db = drizzle(sql, { schema });