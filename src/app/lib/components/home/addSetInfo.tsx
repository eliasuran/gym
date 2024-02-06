'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import { addExerciseSet, type Set } from '../../utils/exercises';
import { Icon } from '@iconify/react';

export default function AddSetInfo(props: {
  exercise_id: string;
  set: Set[];
  setSet: Dispatch<SetStateAction<Set[]>>;
}) {
  const [kg, setKg] = useState('');
  const [reps, setReps] = useState('');
  async function addSet(e: React.FormEvent<HTMLFormElement>) {
    props.setSet([
      ...props.set,
      { exercise_id: props.exercise_id, kg: kg, reps: reps },
    ] as Set[]);
    e.preventDefault();
    await addExerciseSet(props.exercise_id, parseInt(kg), parseInt(reps));
  }

  return (
    <form
      onSubmit={(e) => addSet(e)}
      className='bg-secondary btn btn-secondary text-xl rounded-xl flex gap-2 items-center'
    >
      <input
        className='w-12 bg-transparent placeholder:text-secondary-content'
        type='number'
        placeholder='kg'
        value={kg}
        onChange={(e) => setKg(e.target.value)}
      />
      <input
        className='w-12 bg-transparent placeholder:text-secondary-content'
        type='number'
        placeholder='reps'
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <button
        type='submit'
        className='btn btn-sm drop-shadow-md grid place-items-center'
      >
        <Icon icon='akar-icons:plus' />
      </button>
    </form>
  );
}
