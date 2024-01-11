'use client';

import type { QueryResultRow } from 'pg';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

export default function NewExercise(props: {
  exercises: QueryResultRow[];
  user: string;
}) {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      {showSearch ? (
        <SearchExercise
          exercises={props.exercises}
          setShowSearch={setShowSearch}
          user={props.user}
        />
      ) : (
        <button
          className='w-16 aspect-square text-3xl rounded-2xl bg-primary grid place-items-center'
          onClick={() => setShowSearch(true)}
        >
          <FaPlus />
        </button>
      )}
    </>
  );
}

function SearchExercise(props: {
  exercises: QueryResultRow[];
  setShowSearch: (show: boolean) => void;
  user: string;
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

  async function addExercise(name: string) {
    const res = await fetch('/api/addExercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: `${new Date().toLocaleDateString('no-NO')}${props.user}`,
        exercise: name,
      }),
    });
    if (res.status === 200) {
      console.log(await res.json());
    }
    props.setShowSearch(false);
  }

  return (
    <div className='bg-primary rounded-xl overflow-hidden'>
      <input
        className='h-12 w-full p-2 bg-primary outline-none'
        onChange={(e) => searchExercise(e)}
        placeholder='Search for exercise'
      />
      {filteredExercises.slice(0, 5).map((exercise) => (
        <button
          className='h-12 w-full p-2 outline-none'
          onClick={() => addExercise(exercise.name)}
          key={exercise.id}
        >
          {exercise.name}
        </button>
      ))}
    </div>
  );
}
