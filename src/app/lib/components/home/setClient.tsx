'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import AddSetInfo from './addSetInfo';
import NewSet from './newSet';
import type { Set } from '../../utils/exercises';
import { addExerciseSet } from '../../utils/exercises';

export default function SetClient(props: {
  exercise_id: string;
  set: Set[];
  setSet: Dispatch<SetStateAction<Set[]>>;
}) {
  const [showNewSet, setShowNewSet] = useState(false);
  async function addSet(
    e: React.FormEvent<HTMLFormElement>,
    kg: string,
    reps: string,
  ) {
    props.setSet([
      ...props.set,
      { exercise_id: props.exercise_id, kg: kg, reps: reps },
    ] as Set[]);
    e.preventDefault();
    await addExerciseSet(props.exercise_id, parseInt(kg), parseInt(reps));
  }
  return (
    <div className='flex p-2 flex-wrap gap-4 min-h-16 items-center'>
      {props.set.map((set: Set) => (
        <div key={`${set.exercise_id}:${set.setnr}`}>
          <button
            onClick={() =>
              document
                .getElementById(`${set.exercise_id}:${set.setnr}`)
                .showModal()
            }
            className='btn btn-secondary flex justify-between text-xl'
          >
            <div className='flex flex-col'>
              <span className='text-xs'>kg</span>
              {set.kg}
            </div>
            <div className='bg-secondary-content h-5/6 w-[1px]' />
            <div className='flex flex-col'>
              <span className='text-xs'>reps</span>
              {set.reps}
            </div>
          </button>
          <dialog id={`${set.exercise_id}:${set.setnr}`} className='modal'>
            <div className='modal-box'>
              <h3>{set.setnr}</h3>
            </div>
            <form method='dialog' className='modal-backdrop'>
              <button />
            </form>
          </dialog>
        </div>
      ))}
      {showNewSet && (
        <AddSetInfo
          exercise_id={props.exercise_id}
          set={props.set}
          setSet={props.setSet}
        />
      )}
      <NewSet open={setShowNewSet} />
    </div>
  );
}
