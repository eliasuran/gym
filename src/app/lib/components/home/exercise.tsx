import SetClient from './setClient';
import { getExerciseSets } from '../../utils/exercises';
import { PoolClient } from 'pg';

export default async function Exercise(props: {
  exercise_id: string;
  exercise: string;
  client: PoolClient;
}) {
  const sets = await getExerciseSets(props.client, props.exercise_id);
  console.log(sets);
  return (
    <div className='bg-primary text-primary-content p-2 card overflow-hidden text-center'>
      {sets.map((set) => (
        <h1 key={`${set.exercise_id}:${set.setnr}`}>
          {set.kg}/{set.reps}
        </h1>
      ))}
      <h2>{props.exercise}</h2>
      <SetClient exercise_id={props.exercise_id} />
    </div>
  );
}
