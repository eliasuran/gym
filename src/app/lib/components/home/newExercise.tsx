'use client';

import { Icon } from '@iconify/react';
import type { QueryResultRow } from 'pg';
import { useState } from 'react';
import { Session } from '../../types/session';

export default function NewExercise(props: {
  exercises: QueryResultRow[];
  session: Session;
}) {
  const [showSearch, setShowSearch] = useState(true);
  return (
    <>
      {showSearch ? (
        <SearchExercise
          exercises={props.exercises}
          setShowSearch={setShowSearch}
          session={props.session}
        />
      ) : (
        <button
          className='w-16 aspect-square text-3xl rounded-2xl bg-primary grid place-items-center'
          onClick={() => setShowSearch(true)}
        >
          <Icon icon='akar-icons:plus' />
        </button>
      )}
    </>
  );
}

function SearchExercise(props: {
  exercises: QueryResultRow[];
  setShowSearch: (show: boolean) => void;
  session: Session;
}) {
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

  async function addExercise(id: string) {
    console.log(id);
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
    props.setShowSearch(false);
  }

  return (
    <div className='overflow-hidden flex flex-col gap-2'>
      <div className='flex items-center gap-2 px-4 py-1 bg-primary rounded-xl text-3xl '>
        <Icon icon='carbon:search' />
        <input
          className='h-12 w-full bg-transparent outline-none text-lg'
          onChange={(e) => searchExercise(e)}
          placeholder='Search for exercise'
        />
      </div>
      <div className='bg-primary rounded-xl overflow-hidden'>
        {filteredExercises.slice(0, 5).map((exercise) => (
          <div
            className='w-full border-b border-secondary flex items-center gap-3 px-4 py-3'
            key={exercise.id}
          >
            <Icon icon='carbon:search' />
            <button
              className='text-lg'
              onClick={() => addExercise(exercise.id)}
            >
              {exercise.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
