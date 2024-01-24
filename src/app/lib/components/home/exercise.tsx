import SetClient from './setClient';
import { getExerciseSets } from '../../utils/exercises';
import { PoolClient } from 'pg';

export default async function Exercise(props: {
  exercise_id: string;
  exercise: string;
  client: PoolClient;
}) {
  const sets = await getExerciseSets(props.client, props.exercise_id);
  return (
    <div className='bg-primary text-primary-content h-28 p-2 rounded-xl overflow-hidden text-center'>
      {sets.map((set) => (
        <h1>
          {set.kg}/{set.reps}
        </h1>
      ))}
      <h2>{props.exercise}</h2>
      <SetClient exercise_id={props.exercise_id} />
    </div>
  );
}
