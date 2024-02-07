'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import AddSetInfo from './addSetInfo';
import NewSet from './newSet';
import type { Set } from '../../utils/exercises';
import { editExerciseSet, deleteExerciseSet } from '../../utils/exercises';
import { Input } from '../Input';

export default function SetClient(props: {
  exercise_id: string;
  set: Set[];
  setSet: Dispatch<SetStateAction<Set[]>>;
}) {
  const [showNewSet, setShowNewSet] = useState(false);

  const [kg, setKg] = useState(0);
  const [reps, setReps] = useState(0);
  return (
    <div className='flex p-2 flex-wrap gap-4 min-h-16 items-center'>
      {props.set.map((set: Set) => (
        <div key={`${set.exercise_id}:${set.setnr}`}>
          <button
            onClick={() =>
              document
                .getElementById(`${set.exercise_id}:${set.setnr}`)
                ?.showModal()
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
            <form
              onSubmit={() => {
                if (kg === 0 && reps === 0)
                  editExerciseSet(set.exercise_id, set.setnr, set.kg, set.reps);
                else if (kg === 0)
                  editExerciseSet(set.exercise_id, set.setnr, set.kg, reps);
                else if (reps === 0)
                  editExerciseSet(set.exercise_id, set.setnr, kg, set.reps);
                else editExerciseSet(set.exercise_id, set.setnr, kg, reps);

                setKg(0);
                setReps(0);
              }}
              className='modal-box bg-primary text-sm font-semibold flex flex-col justify-center text-primary-content'
            >
              <h3>Set number: {set.setnr + 1}</h3>
              <div>
                <label htmlFor='kg'>kg:</label>
                <Input
                  id='kg'
                  type='number'
                  placeholder='kg'
                  defaultValue={set.kg}
                  onChange={(e) => setKg(e.target.value)}
                />
                <label htmlFor='reps'>reps:</label>
                <Input
                  id='reps'
                  type='number'
                  placeholder='reps'
                  defaultValue={set.reps}
                  onChange={(e) => setReps(e.target.value)}
                />
              </div>
              <button type='submit'>Edit</button>
              <button
                onClick={() => {
                  deleteExerciseSet(set.exercise_id, set.setnr);
                  window.location.reload();
                }}
                type='button'
                className='text-red-400'
              >
                Delete
              </button>
            </form>
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
          setShowNewSet={setShowNewSet}
        />
      )}
      {!showNewSet && <NewSet open={setShowNewSet} />}
    </div>
  );
}
