'use server';

import { getExercises } from './lib/utils/getExercises';
import { cookies } from 'next/headers';
import Header from '@/app/lib/components/home/header';
import NewExercise from '@/app/lib/components/home/newExercise';

export default async function Page() {
  const exercises = await getExercises();
  const session = cookies().get('session');
  const user = session?.value || '';
  return (
    <div className='h-full p-4 flex flex-col gap-4 text-2xl'>
      {session && <h1>Logged in as: {session.value}</h1>}
      <Header />
      <NewExercise user={user} exercises={exercises} />
    </div>
  );
}
