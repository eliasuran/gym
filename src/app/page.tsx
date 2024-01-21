'use server';

import { getSession } from './lib/utils/getSession';
import type { Session } from './lib/types/session';
import { getExercises } from './lib/utils/getExercises';
import Header from '@/app/lib/components/home/header';
import NewExercise from '@/app/lib/components/home/newExercise';
import { pool } from './lib/data';

export default async function Page() {
  const client = await pool.connect();
  const session: Session = await getSession();
  const exercises = await getExercises();
  client.release();
  return (
    <div className='h-full p-4 flex flex-col gap-4 text-2xl'>
      <Header session={session} />
      <NewExercise session={session} exercises={exercises} />
    </div>
  );
}
