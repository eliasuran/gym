'use client';

import { useEffect, useState } from 'react';
import { QueryResultRow } from 'pg';
import { LineChart } from './lineChart';

export default function Stats(props: {
  exercises: QueryResultRow[];
  stats: QueryResultRow[];
}) {
  const tempStats = [];

  for (let i = 0; i < 10; i++) {
    tempStats.push(i);
  }

  const [filteredStats, setFilteredStats] = useState<QueryResultRow[]>(
    props.stats,
  );

  function filterStats(selected: string) {
    setFilteredStats(
      props.stats.filter((item) => {
        return selected === item.exercise_name;
      }),
    );
  }

  useEffect(() => console.log(filteredStats), [filteredStats]);

  return (
    <>
      <div className='flex justify-between'>
        <Selector items={props.exercises} filterStats={filterStats} />
      </div>
      <LineChart labels={tempStats} stats={tempStats} />
      <h1>Advanced stats</h1>
    </>
  );
}

function Selector(props: {
  items: QueryResultRow[];
  filterStats: (selected: string) => void;
}) {
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
              <button onClick={() => props.filterStats(item.name)}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
