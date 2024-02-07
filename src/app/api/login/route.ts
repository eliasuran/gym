import { query } from '@/app/lib/data';
import { NextResponse } from 'next/server';
import { promisify } from 'util';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  try {
    const user = await query('SELECT password FROM users WHERE username = $1', [
      username,
    ]);
    if (user.rows.length > 0) {
      const result = await promisify(bcrypt.compare)(
        password,
        user.rows[0].password,
      );

      if (!result) {
        return NextResponse.json(
          { error: 'Incorrect password' },
          { status: 401 },
        );
      }

      const res = await query(
        'SELECT users.id FROM users WHERE username = $1 AND password = $2',
        [username, user.rows[0].password],
      );

      const existingSession = await query(
        'SELECT * FROM login_sessions WHERE user_id = $1',
        [res.rows[0].id],
      );

      if (existingSession.rows.length > 0) {
        await query('DELETE FROM login_sessions WHERE user_id = $1', [
          res.rows[0].id,
        ]);
      }

      const sessionId = v4();
      await query(
        'INSERT INTO login_sessions (id, user_id, user_username) VALUES ($1, $2, $3)',
        [sessionId, res.rows[0].id, username],
      );
      cookies().set({
        name: 'session',
        value: sessionId,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      return NextResponse.json({ user: res.rows[0] }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'User does not exist' },
        {
          status: 401,
        },
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
