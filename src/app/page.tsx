import { connect } from './lib/data';
import type { PoolClient } from 'pg';
import { getSession } from './lib/utils/session';
import type { Session } from './lib/types/session';
import { getExercises, getAddedExercises } from './lib/utils/exercises';
import Client from './lib/components/home/client';

export default async function Page() {
  const client: PoolClient = await connect();
  const session: Session = await getSession();
  const exercises = await getExercises(client);
  const addedExercises = await getAddedExercises(client, session);
  return (
    <div className='h-full p-4 flex flex-col gap-4 text-2xl'>
      <Client
        session={session}
        exercises={exercises}
        addedExercises={addedExercises}
      />
    </div>
  );
}
