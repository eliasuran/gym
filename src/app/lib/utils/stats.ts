import type { Session } from '../types/session';
import { getSession } from './session';
import { connect } from '../data';

export interface Stat {
  id: string;
  user_id: string;
  date: string;
  //  exercises: [
  //    {
  //      exercise_name: string;
  //      sets: [
  //        {
  //          reps: number;
  //          kg: number;
  //        },
  //      ];
  //    },
  //  ];
  exercise_name: string;
  reps: number;
  kg: number;
  setnr: number;
}

export async function getStats() {
  const client = await connect();
  const session: Session = await getSession();
  const stats = await client.query(
    `SELECT 
      session.id, 
      session.date, 
      exercises.name AS exercise_name,
      exerciseSet.reps,
      exerciseSet.kg,
      exerciseSet.setnr
    FROM 
      session 
    JOIN 
      exercise ON exercise.session_id = session.id 
    JOIN
      exerciseSet ON exerciseSet.exercise_id = exercise.id
    JOIN
      exercises ON exercises.id = exercise.exercise_id
    WHERE 
      session.user_id = $1`,
    [session.user_id],
  );

  console.log(stats.rows);

  return stats.rows;
}
