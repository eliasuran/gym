import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  try {
    const res = await sql`
    SELECT users.id FROM users WHERE username = ${username} AND password = ${password}`;
    if (res.rowCount > 0) {
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
