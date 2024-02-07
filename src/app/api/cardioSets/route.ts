import { query } from '@/app/lib/data';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { exercise_id, kg, reps } = await request.json();
  try {
    const exists = await query(
      'SELECT * FROM exerciseSet WHERE exercise_id = $1',
      [exercise_id],
    );

    if (!exists) {
      await query('INSERT INTO exerciseSet VALUES ($1, $2, $3, $4)', [
        exercise_id,
        kg,
        reps,
      ]);
      return NextResponse.json(
        { set: { exercise_id, kg, reps } },
        { status: 200 },
      );
    }

    await query(
      'UPDATE exerciseSet SET kg = $1, reps = $2 WHERE exercise_id = $3',
      [kg, reps, exercise_id],
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
