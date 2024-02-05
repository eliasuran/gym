import { query } from './lib/data';
import { getSession } from './lib/utils/session';
import type { Session } from './lib/types/session';
import { getExercises, getAddedExercises } from './lib/utils/exercises';
import Client from './lib/components/home/client';

export default async function Page() {
  const session: Session = await getSession();
  const exercises = await getExercises(query);
  const addedExercises = await getAddedExercises(query, session);
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
