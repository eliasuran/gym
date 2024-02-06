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

export async function POST(request: NextRequest) {
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

export async function PUT(request: NextRequest) {
  const { exercise_id, setnr, kg, reps } = await request.json();
  try {
    await query(
      'UPDATE exerciseSet SET kg = $1, reps = $2 WHERE exercise_id = $3 AND setnr = $4',
      [kg, reps, exercise_id, setnr],
    );
    return NextResponse.json(
      { message: 'Set updated', set: { exercise_id, kg, reps, setnr } },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { exercise_id, setnr } = await request.json();
  try {
    await query(
      'DELETE FROM exerciseSet WHERE exercise_id = $1 AND setnr = $2',
      [exercise_id, setnr],
    );
    return NextResponse.json({ message: 'Set deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
