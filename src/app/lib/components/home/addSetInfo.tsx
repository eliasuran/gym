'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import type { Set } from '../../utils/exercises';
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
    try {
      e.preventDefault();
      await fetch('api/sets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exercise_id: props.exercise_id,
          kg: kg,
          reps: reps,
        }),
      });
    } catch (error) {
      console.log(error);
    }
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
        onChange={(e) => setKg(e.target.value)}
      />
      <input
        className='w-12 bg-transparent placeholder:text-secondary-content'
        type='number'
        placeholder='reps'
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
