import { query } from '@/app/lib/data';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { exercise_id, session_id, user, date, exercise } =
    await request.json();
  try {
    const exists = await query('SELECT * FROM session WHERE id = $1', [
      session_id,
    ]);
    if (exists.rows.length === 0) {
      await query('INSERT INTO session VALUES ($1, $2, $3)', [
        session_id,
        user,
        date,
      ]);
    }
    await query('INSERT INTO exercise VALUES ($1, $2, $3)', [
      exercise_id,
      session_id,
      exercise,
    ]);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { exercise_id } = await request.json();
  try {
    await query('DELETE FROM exercise WHERE id = $1', [exercise_id]);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
