import Exercise from '@/components/home/exercise';
import SearchExercise from '@/components/home/searchExercise';
import NewExercise from '@/components/home/newExercise';

export default async function Page() {
  return (
    <div className='h-full p-4 flex flex-col gap-4 text-2xl'>
      <div className='w-full flex flex-col justify-center items-center gap-1'>
        <h1>{new Date().toLocaleDateString('no-NO')}</h1>
        <div className='w-full h-[1px] bg-text' />
      </div>
      <Exercise />
      <SearchExercise />
      <NewExercise />
    </div>
  );
}
