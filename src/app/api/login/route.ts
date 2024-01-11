import { pool } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const client = await pool.connect();
  const { username, password } = await request.json();
  try {
    const res = await client.query(
      'SELECT users.id FROM users WHERE username = $1 AND password = $2',
      [username, password],
    );
    if (res.rows.length > 0) {
      console.log('work');
      return NextResponse.json({ res }, { status: 200 });
    } else {
      return NextResponse.json('Incorrect username or password', {
        status: 401,
      });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
