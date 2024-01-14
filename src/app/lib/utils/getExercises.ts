import { pool } from '../data';
import type { QueryResultRow } from 'pg';

export async function getExercises() {
  const client = await pool.connect();
  const res = await client.query('SELECT * FROM exercises');
  const data: QueryResultRow[] = res.rows;
  client.release();
  return data;
}
