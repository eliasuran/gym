'use client';
import type { Exercises } from '@/app/lib/types/Exercise';
import { useEffect, useState } from 'react';

export default function SearchExercise(props: { exercises: Exercises[] }) {
  const [filteredExercises, setFilteredExercises] = useState<Exercises[]>(
    props.exercises,
  );

  function searchExercise(e: React.ChangeEvent<HTMLInputElement>) {
    setFilteredExercises(
      props.exercises.filter((exercise) => {
        return exercise.exercise
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      }),
    );
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
          className='h-12 w-full p-2 focus:bg-secondary outline-none'
          key={exercise.id}
        >
          {exercise.exercise}
        </button>
      ))}
    </div>
  );
}
