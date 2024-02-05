import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_URL,
  ssl: true,
});

export async function query(text: string, params: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

export async function connect() {
  const client = await pool.connect();
  client.release();
  return client;
}
