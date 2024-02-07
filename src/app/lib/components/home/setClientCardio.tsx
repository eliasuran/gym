'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import type { Set } from '../../utils/exercises';
import { Input } from '../Input';
import { addExerciseSetCardio } from '../../utils/exercises';

export default function SetClientCardio(props: {
  exercise_id: string;
  set: Set[];
  setSet: Dispatch<SetStateAction<Set[]>>;
}) {
  const [km, setKm] = useState(0);
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (props.set.length > 0) {
      setKm(props.set[props.set.length - 1].kg);
      setTime(props.set[props.set.length - 1].reps);
    }
  }, [props.set]);
  return (
    <div className='flex p-2 flex-wrap gap-4 min-h-16 items-center'>
      <form
        onSubmit={() => addExerciseSetCardio(props.exercise_id, km, time)}
        className='bg-secondary btn btn-secondary text-xl rounded-xl flex gap-2 items-center'
      >
        <Input
          type='number'
          placeholder='kg'
          value={km}
          onChange={(e) => setKm(e.target.value)}
        />
        <Input
          type='number'
          placeholder='reps'
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          type='submit'
          className='btn btn-sm drop-shadow-md grid place-items-center'
        >
          Save
        </button>
      </form>
    </div>
  );
}
