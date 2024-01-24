'use client';

import { useState } from 'react';
import AddSetInfo from './addSetInfo';
import NewSet from './newSet';

export default function SetClient(props: { exercise_id: string }) {
  const [showNewSet, setShowNewSet] = useState(false);
  return (
    <div className='flex flex-wrap gap-4 h-16 items-center'>
      {showNewSet && <AddSetInfo exercise_id={props.exercise_id} />}
      <NewSet open={setShowNewSet} />
    </div>
  );
}
