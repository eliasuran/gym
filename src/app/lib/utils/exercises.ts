import type { QueryResultRow } from 'pg';
import { Session } from '../types/session';

export interface Exercises {
  id: number;
  exercise: string;
}

/////// EXERCISES ///////
export async function getExercises(query: any) {
  const res = await query('SELECT * FROM exercises');
  const data: QueryResultRow[] = res.rows;
  return data;
}

export async function getAddedExercises(query: any, session: Session) {
  const id = new Date().toLocaleDateString('no-NO') + session.user_username;
  const res = await query(
    'SELECT exercise.*, exercises.name FROM exercise JOIN exercises ON exercise.exercise_id=exercises.id WHERE session_id = $1',
    [id],
  );
  const data: QueryResultRow[] = res.rows;
  return data;
}

export async function deleteExercise(exercise_id: string) {
  await fetch('api/exercises', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      exercise_id: exercise_id,
    }),
  });
}

/////// SETS ///////
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
  const res = await fetch('api/sets', {
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

  if (res.status !== 200) {
    console.error('Failed to add set');
  }
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

export async function editExerciseSet(
  exercise_id: string,
  setnr: number,
  kg: number,
  reps: number,
) {
  const res = await fetch('api/sets', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      exercise_id: exercise_id,
      setnr: setnr,
      kg: kg,
      reps: reps,
    }),
  });

  if (res.status !== 200) {
    console.error('Failed to edit set');
    return await res.json();
  }

  return await res.json();
}

export async function deleteExerciseSet(exercise_id: string, setnr: number) {
  const res = await fetch('api/sets', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      exercise_id: exercise_id,
      setnr: setnr,
    }),
  });

  if (res.status !== 200) {
    console.error('Failed to delete set');
  }
}
