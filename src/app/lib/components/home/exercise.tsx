import { useState, useEffect } from 'react';
import SetClient from './setClient';
import { Set, getExerciseSets } from '../../utils/exercises';

export default function Exercise(props: {
  exercise_id: string;
  exercise: string;
}) {
  const [set, setSet] = useState([] as Set[]);

  useEffect(() => {
    getExerciseSets(props.exercise_id).then((data) => setSet(data.sets));
  }, [props.exercise_id]);
  return (
    <div className='bg-primary text-primary-content p-2 card overflow-hidden text-center'>
      {set.map((set: Set) => (
        <h1 key={`${set.exercise_id}:${set.setnr}`}>
          {set.kg}/{set.reps}
        </h1>
      ))}
      <h2>{props.exercise}</h2>
      <SetClient exercise_id={props.exercise_id} set={set} setSet={setSet} />
    </div>
  );
}
