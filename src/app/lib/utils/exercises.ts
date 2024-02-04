import type { QueryResultRow } from 'pg';
import type { PoolClient } from 'pg';
import { Session } from '../types/session';

export async function getExercises(client: PoolClient) {
  const res = await client.query('SELECT * FROM exercises');
  const data: QueryResultRow[] = res.rows;
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

export interface Set {
  exercise_id: string;
  kg: number;
  reps: number;
  setnr: number;
}

export async function addExerciseSet(
  exercise_id: string,
  kg: number,
  reps: number,
) {
  await fetch('api/sets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      exercise_id: exercise_id,
      kg: kg,
      reps: reps,
    }),
  });
}

export async function getExerciseSets(exercise_id: string) {
  const res = await fetch(`/api/sets/?exercise_id=${exercise_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await res.json();
}
