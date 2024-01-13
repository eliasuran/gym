'use server';

import { getSession } from './lib/utils/getSession';
import type { Session } from './lib/types/session';
import { getExercises } from './lib/utils/getExercises';
import Header from '@/app/lib/components/home/header';
import NewExercise from '@/app/lib/components/home/newExercise';

export default async function Page() {
  const session: Session = await getSession();
  const exercises = await getExercises();
  return (
    <div className='h-full p-4 flex flex-col gap-4 text-2xl'>
      {session && <h1>Logged in as: {session.user_username}</h1>}
      <Header session={session} />
      <NewExercise user={session.user_username} exercises={exercises} />
    </div>
  );
}
