import { connect } from '@/app/lib/data';
import { NextResponse } from 'next/server';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const client = await connect();
  const { username, password } = await request.json();
  const id = v4();
  client.release();
  try {
    const hash = await bcrypt.hash(password, 10);
    await client.query(
      'INSERT INTO users (id, username, password) VALUES ($1, $2, $3)',
      [id, username, hash],
    );

    const data = await client.query('SELECT * FROM users WHERE id = $1', [id]);

    return NextResponse.json({ data: data.rows[0] }, { status: 200 });
  } catch (error: any) {
    if (error.code === 23505) {
      return NextResponse.json(
        { error: 'User alredy exists' },
        { status: 409 },
      );
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
