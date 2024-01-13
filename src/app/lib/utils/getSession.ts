import { pool } from '../data';
import { cookies } from 'next/headers';

export async function getSession() {
  const client = await pool.connect();
  const session = cookies().get('session');
  if (!session) {
    return null;
  }
  const loginSession = await client.query(
    'SELECT * FROM login_sessions WHERE id = $1',
    [session.value],
  );
  if (loginSession.rows.length === 0) {
    return null;
  }
  return loginSession.rows[0];
}
