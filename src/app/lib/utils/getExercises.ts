import { sql } from '@vercel/postgres';
import type { QueryResultRow } from 'pg';

export async function getExercises() {
  const res = await sql`SELECT * FROM exercises LIMIT 1000`;
  const data: QueryResultRow[] = res.rows;
  return data;
}
