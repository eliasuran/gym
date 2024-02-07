import { QueryResultRow } from 'pg';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Exercises } from '../utils/exercises';
import { Stat } from '../utils/stats';

export interface AdvancedStats {
  selected: Exercises;
  setSelected: Dispatch<SetStateAction<Exercises>>;
  filteredStats: Stat[];
  highest: number;
}

// give original version of stats
export function useAdvancedStats(stats: QueryResultRow[]) {
  const [selected, setSelected] = useState({} as Exercises);

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
