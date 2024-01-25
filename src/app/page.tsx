import { pool } from './lib/data';
import type { PoolClient } from 'pg';
import { getSession } from './lib/utils/session';
import type { Session } from './lib/types/session';
import { getExercises, getAddedExercises } from './lib/utils/exercises';
import Header from '@/app/lib/components/home/header';
import NewExercise from '@/app/lib/components/home/newExercise';

import Exercise from './lib/components/home/exercise';

export default async function Page() {
  const client: PoolClient = await pool.connect();
  const session: Session = await getSession();
  const exercises = await getExercises(client);
  const addedExercises = await getAddedExercises(client, session);
  return (
    <div className='h-full p-4 flex flex-col gap-4 text-2xl'>
      <Header session={session} />
      {addedExercises.map((exercise) => (
        <Exercise
          key={`${exercise.session_id}:${exercise.exercise_id}`}
          exercise_id={exercise.id}
          exercise={exercise.name}
          client={client}
        />
      ))}
      <NewExercise
        session={session}
        exercises={exercises}
        addedExercises={addedExercises}
      />
    </div>
  );
}
