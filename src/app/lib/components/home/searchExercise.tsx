'use client';
import type { Exercises } from '@/app/lib/types/Exercise';
import { useEffect, useState } from 'react';

export default function SearchExercise(props: { exercises: Exercises[] }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    props.exercises.filter((exercise) => {
      return exercise.exercise.toLowerCase().includes(search.toLowerCase());
    });
  }, [search]);

  return (
    <div className='bg-primary rounded-xl overflow-hidden'>
      <input
        className='h-12 w-full p-2 bg-primary outline-none'
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search for exercise'
      />
      {props.exercises.map((exercise) => (
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
