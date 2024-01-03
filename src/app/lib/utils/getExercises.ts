import { sql } from '@vercel/postgres';
import type { Exercises } from '@/app/lib/types/Exercise';

export async function getExercises() {
  const res = await sql`SELECT * FROM exercises LIMIT 1000`;
  const data: Exercises[] = res.rows;
  return data;
}
