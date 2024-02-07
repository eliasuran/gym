'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { LineChart } from './lineChart';
import { useAdvancedStats } from '../../hooks/useAdvancedStats';
import { Stat } from '../../utils/stats';
import { Exercises } from '../../utils/exercises';

export default function Stats(props: {
  exercises: Exercises[];
  stats: Stat[];
}) {
  const { selected, setSelected, filteredStats, highest } = useAdvancedStats(
    props.stats,
  );

  console.log(filteredStats);

  const tempStats = [];

  for (let i = 0; i < 10; i++) {
    tempStats.push(i);
  }
  return (
    <>
      <div className='flex justify-between'>
        <Selector items={props.exercises} setSelected={setSelected} />
      </div>
      <LineChart
        dataLabel={selected.name}
        labels={tempStats}
        stats={tempStats}
      />
      <h1>Advanced stats</h1>
      <div className='flex flex-col gap-4'>
        <div className='border-2 border-primary rounded-box flex-grow h-24 p-2'>
          <h2 className='font-semibold'>Highest</h2>
          <h3>{highest}</h3>
        </div>
      </div>
    </>
  );
}

function Selector(props: {
  items: Exercises[];
  setSelected: Dispatch<SetStateAction<Exercises>>;
}) {
  const [filteredExercises, setFilteredExercises] = useState<Exercises[]>(
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
          {filteredExercises.slice(0, 5).map((item: Exercises) => (
            <li key={item.id}>
              <button onClick={() => props.setSelected(item)}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
