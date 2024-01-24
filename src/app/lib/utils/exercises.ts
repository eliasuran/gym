import type { QueryResultRow } from 'pg';
import type { PoolClient } from 'pg';
import { Session } from '../types/session';

export async function getExercises(client: PoolClient) {
  const res = await client.query('SELECT * FROM exercises');
  const data: QueryResultRow[] = res.rows;
  client.release();
  return data;
}

export async function getAddedExercises(client: PoolClient, session: Session) {
  const id = new Date().toLocaleDateString('no-NO') + session.user_username;
  const res = await client.query(
    'SELECT exercise.*, exercises.name FROM exercise JOIN exercises ON exercise.exercise_id=exercises.id WHERE session_id = $1',
    [id],
  );
  const data: QueryResultRow[] = res.rows;
  return data;
}

export async function getExerciseSets(client: PoolClient, exercise_id: string) {
  const res = await client.query(
    'SELECT * FROM exerciseSet WHERE exercise_id = $1',
    [exercise_id],
  );
  const data: QueryResultRow[] = res.rows;
  return data;
}
