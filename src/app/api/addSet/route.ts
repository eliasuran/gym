import { connect } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const client = await connect();
  const { exercise_id, kg, reps } = await request.json();
  try {
    const setNr = await client.query(
      'SELECT * FROM exerciseSet WHERE exercise_id = $1',
      [exercise_id],
    );
    await client.query('INSERT INTO exerciseSet VALUES ($1, $2, $3, $4)', [
      exercise_id,
      kg,
      reps,
      setNr.rowCount,
    ]);
    return NextResponse.json(
      { set: { exercise_id, kg, reps, setNr: setNr.rowCount } },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
