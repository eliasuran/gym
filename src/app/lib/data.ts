import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_URL,
  ssl: true,
});

export async function connect() {
  const client = await pool.connect();
  client.release();
  return client;
}
