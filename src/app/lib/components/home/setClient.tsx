'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import AddSetInfo from './addSetInfo';
import NewSet from './newSet';
import type { Set } from '../../utils/exercises';

export default function SetClient(props: {
  exercise_id: string;
  set: Set[];
  setSet: Dispatch<SetStateAction<Set[]>>;
}) {
  const [showNewSet, setShowNewSet] = useState(false);
  return (
    <div className='flex flex-wrap gap-4 h-16 items-center'>
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
