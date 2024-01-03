'use server';

import { cookies } from 'next/headers';
import Header from '@/app/lib/components/home/header';
import Exercise from '@/app/lib/components/home/exercise';
import SearchExercise from '@/app/lib/components/home/searchExercise';
import NewExercise from '@/app/lib/components/home/newExercise';
import { getExercises } from './lib/utils/getExercises';

export default async function Page() {
  const exercises = await getExercises();
  const session = cookies().get('session');
  return (
    <div className='h-full p-4 flex flex-col gap-4 text-2xl'>
      {session && <h1>Logged in as: {session.value}</h1>}
      <Header />
      <Exercise />
      <SearchExercise exercises={exercises} />
      <NewExercise />
    </div>
  );
}
