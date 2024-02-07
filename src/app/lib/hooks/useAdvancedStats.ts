import { QueryResultRow } from 'pg';
import { useEffect, useState } from 'react';
import { Exercises } from '../utils/exercises';

export interface AdvancedStats {
  selected: Exercises;
  setSelected: (selected: Exercises) => void;
  filteredStats: QueryResultRow[];
  highest: number;
}

// give original version of stats
export function useAdvancedStats(stats: QueryResultRow[]) {
  const [selected, setSelected] = useState({
    name: 'Lat Pulldown',
  } as Exercises);

  const [filteredStats, setFilteredStats] = useState(stats);

  useEffect(() => {
    setFilteredStats(
      stats.filter((item) => {
        return selected.name === item.exercise_name;
      }),
    );
  }, [selected]);

  let highest = 0;
  for (let i = 0; i < filteredStats.length; i++) {
    const current = filteredStats[i];
    if (current.kg > highest) {
      highest = current.kg;
    }
  }

  return { selected, setSelected, filteredStats, highest };
}
