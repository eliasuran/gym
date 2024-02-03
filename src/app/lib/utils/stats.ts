import type { Session } from '../types/session';
import { getSession } from './session';
import { connect } from '../data';

export async function getStats() {
  const client = await connect();
  const session: Session = await getSession();
  const stats = await client.query('SELECT * FROM session WHERE id = $1', [
    new Date().toLocaleDateString('no-NO') + session.user_username,
  ]);
  console.log(stats.rows);
}
