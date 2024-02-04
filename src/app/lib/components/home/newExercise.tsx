'use client';

import { Icon } from '@iconify/react';
import type { QueryResultRow } from 'pg';
import { useState } from 'react';
import { Session } from '../../types/session';

export default function NewExercise(props: {
  exercises: QueryResultRow[];
  session: Session;
  addedExercises: QueryResultRow[];
  setAddedExercises: (exercises: QueryResultRow[]) => void;
}) {
  return (
    <>
      <SearchExercise
        exercises={props.exercises}
        session={props.session}
        addedExercises={props.addedExercises}
        setAddedExercises={props.setAddedExercises}
      />
    </>
  );
}

function SearchExercise(props: {
  exercises: QueryResultRow[];
  session: Session;
  addedExercises: QueryResultRow[];
  setAddedExercises: (exercises: QueryResultRow[]) => void;
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [filteredExercises, setFilteredExercises] = useState<QueryResultRow[]>(
    props.exercises,
  );

  function searchExercise(e: React.ChangeEvent<HTMLInputElement>) {
    setFilteredExercises(
      props.exercises.filter((exercise) => {
        return exercise.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      }),
    );
  }

  function addExerciseClient(name: string) {
    props.setAddedExercises([
      ...props.addedExercises,
      {
        id: `${new Date().toLocaleDateString('no-NO')}${
          props.session.user_username
        }`,
        date: new Date().toLocaleDateString('no-NO'),
        user: props.session.user_id,
        exercise: name,
      },
    ]);
  }

  async function addExercise(id: string, name: string) {
    addExerciseClient(name);
    const res = await fetch('/api/addExercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: `${new Date().toLocaleDateString('no-NO')}${
          props.session.user_username
        }`,
        date: new Date().toLocaleDateString('no-NO'),
        user: props.session.user_id,
        exercise: id,
      }),
    });
    if (res.status === 200) {
      console.log(await res.json());
    }
  }

  return (
    <div className='overflow-hidden flex flex-col gap-2'>
      <div className='flex items-center gap-2 px-4 py-1 bg-primary text-primary-content input outline-none text-3xl '>
        <Icon icon='carbon:search' />
        <input
          className='h-12 w-full bg-transparent outline-none text-lg placeholder:text-primary-content'
          onChange={(e) => searchExercise(e)}
          placeholder='Search for exercise'
          onFocus={() => setShowSearch(true)}
          onBlur={() => setShowSearch(false)}
        />
      </div>
      {showSearch && (
        <div className='bg-primary card overflow-hidden'>
          {filteredExercises.slice(0, 5).map((exercise) => (
            <button
              onMouseDown={() => addExercise(exercise.id, exercise.name)}
              className='w-full border-b border-primary-content flex items-center gap-3 px-4 py-3 text-primary-content'
              key={exercise.id}
            >
              <Icon icon='carbon:search' />
              <span className='text-lg'>{exercise.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
