import { connect } from '../lib/data';
import { getExercises } from '../lib/utils/exercises';
import { Stat, getStats } from '../lib/utils/stats';
import Stats from '../lib/components/stats/stats';

export default async function Page() {
  const client = await connect();
  const stats: Stat[] = await getStats();
  const exercises = await getExercises(client);
  return (
    <div>
      <Stats exercises={exercises} />
      <div>
        {stats.map((stat) => (
          <h1 key={`${stat.id}${stat.exercise_name}${stat.setnr}`}>
            {stat.id}
          </h1>
        ))}
      </div>
    </div>
  );
}
