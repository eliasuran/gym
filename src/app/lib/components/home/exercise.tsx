import { useState, useEffect } from 'react';
import SetClient from './setClient';
import SetClientCardio from './setClientCardio';
import { Set, getExerciseSets } from '../../utils/exercises';
import { Icon } from '@iconify/react/dist/iconify.js';
import { deleteExercise } from '../../utils/exercises';

export default function Exercise(props: {
  exercise_id: string;
  exercise: string;
  exercise_type: string;
}) {
  const [set, setSet] = useState([] as Set[]);

  useEffect(() => {
    getExerciseSets(props.exercise_id).then((data) => setSet(data.sets));
  }, []);
  return (
    <div className='bg-primary text-primary-content p-2 card overflow-hidden text-center relative'>
      <button
        onClick={() => {
          deleteExercise(props.exercise_id);
          window.location.reload();
        }}
        className='btn btn-secondary btn-sm absolute right-2 top-2'
      >
        <Icon icon='material-symbols:close' />
      </button>
      <h2>{props.exercise}</h2>
      {props.exercise_type === 'Running' ? (
        <SetClientCardio
          exercise_id={props.exercise_id}
          set={set}
          setSet={setSet}
        />
      ) : (
        <SetClient exercise_id={props.exercise_id} set={set} setSet={setSet} />
      )}
    </div>
  );
}
