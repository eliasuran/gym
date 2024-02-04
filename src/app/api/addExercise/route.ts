import { connect } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const client = await connect();
  const { exercise_id, session_id, user, date, exercise } =
    await request.json();
  try {
    const exists = await client.query('SELECT * FROM session WHERE id = $1', [
      session_id,
    ]);
    if (exists.rows.length === 0) {
      await client.query('INSERT INTO session VALUES ($1, $2, $3)', [
        session_id,
        user,
        date,
      ]);
    }
    await client.query('INSERT INTO exercise VALUES ($1, $2, $3)', [
      exercise_id,
      session_id,
      exercise,
    ]);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
