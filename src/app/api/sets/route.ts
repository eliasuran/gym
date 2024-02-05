import { query } from '@/app/lib/data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const exercise_id = request.nextUrl.searchParams.get('exercise_id');
  try {
    const res = await query(
      'SELECT * FROM exerciseSet WHERE exercise_id = $1',
      [exercise_id],
    );
    if (res.rowCount === 0) {
      return NextResponse.json({ sets: [] }, { status: 200 });
    }
    return NextResponse.json({ sets: res.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { exercise_id, kg, reps } = await request.json();
  try {
    const setNr = await query(
      'SELECT * FROM exerciseSet WHERE exercise_id = $1',
      [exercise_id],
    );
    await query('INSERT INTO exerciseSet VALUES ($1, $2, $3, $4)', [
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
