import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.NEON_URL,
  ssl: true,
});
