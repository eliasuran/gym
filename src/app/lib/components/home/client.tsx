'use client';

import Header from '@/app/lib/components/home/header';
import NewExercise from '@/app/lib/components/home/newExercise';
import Exercise from './exercise';
import { Session } from '../../types/session';
import { useState } from 'react';
import { QueryResultRow } from 'pg';

export default function Client(props: {
  session: Session;
  exercises: QueryResultRow[];
  addedExercises: QueryResultRow[];
}) {
  const [addedExercises, setAddedExercises] = useState(props.addedExercises);
  return (
    <>
      <Header session={props.session} />
      {addedExercises.map((exercise) => (
        <Exercise
          key={`${exercise.session_id}:${exercise.exercise_id}`}
          exercise_id={exercise.id}
          exercise={exercise.name}
          exercise_type={exercise.name}
        />
      ))}
      <NewExercise
        session={props.session}
        exercises={props.exercises}
        addedExercises={addedExercises}
        setAddedExercises={setAddedExercises}
      />
    </>
  );
}
