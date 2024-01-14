import { pool } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const client = await pool.connect();
  const { id, exercise } = await request.json();
  console.log(id, exercise);
  client.release();
  try {
    const exists = await client.query('SELECT * FROM session WHERE id = $1', [
      id,
    ]);
    if (exists.rows.length === 0) {
      await client.query('INSERT INTO session VALUES ($1)', [id]);
    }
    return NextResponse.json({ session: exists.rows[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
