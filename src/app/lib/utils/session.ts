import { query } from '../data';
import { cookies } from 'next/headers';

export async function getSession() {
  const session = cookies().get('session');
  if (!session) {
    return null;
  }
  const loginSession = await query(
    'SELECT * FROM login_sessions WHERE id = $1',
    [session.value],
  );
  if (loginSession.rows.length === 0) {
    return null;
  }
  return loginSession.rows[0];
}
