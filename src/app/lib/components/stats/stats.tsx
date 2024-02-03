'use client';

import { useState } from 'react';
import { QueryResultRow } from 'pg';
import { LineChart } from './lineChart';

export default function Stats(props: { exercises: QueryResultRow[] }) {
  const [selectedExercise, setSelectedExercise] = useState<QueryResultRow>(
    props.exercises[0],
  );
  return (
    <>
      <div className='flex justify-between'>
        <Selector items={props.exercises} setSelected={setSelectedExercise} />
      </div>
      <h1>slected: {selectedExercise.name}</h1>
      <LineChart />
    </>
  );
}

function Selector(props: { items: QueryResultRow[]; setSelected: Function }) {
  const [filteredExercises, setFilteredExercises] = useState<QueryResultRow[]>(
    props.items,
  );
  function search(e: React.ChangeEvent<HTMLInputElement>) {
    setFilteredExercises(
      props.items.filter((item) => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase());
      }),
    );
  }
  return (
    <details className='dropdown w-full'>
      <summary className='btn btn-primary m-1'>open</summary>
      <div className='p-2 menu dropdown-content z-10 bg-primary rounded-btn w-full'>
        <input
          type='text'
          placeholder='Search...'
          className='border-b-2 border-primary-content menu bg-transparent'
          onChange={(e) => search(e)}
        />
        <ul>
          {filteredExercises.slice(0, 5).map((item) => (
            <li key={item.id}>
              <button onClick={() => props.setSelected(item.name)}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
