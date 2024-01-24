import { pool } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const client = await pool.connect();
  const { exercise_id, kg, reps } = await request.json();
  client.release();
  try {
    await client.query('INSERT INTO exerciseSet VALUES ($1, $2, $3)', [
      exercise_id,
      kg,
      reps,
    ]);
    return NextResponse.json(
      { set: { exercise_id, kg, reps } },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
