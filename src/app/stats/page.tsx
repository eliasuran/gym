import { query } from '../lib/data';
import { Exercises, getExercises } from '../lib/utils/exercises';
import { Stat, getStats } from '../lib/utils/stats';
import Stats from '../lib/components/stats/stats';
import { Session } from '../lib/types/session';
import { getSession } from '../lib/utils/session';

export default async function Page() {
  const session: Session = await getSession();
  const stats: Stat[] = await getStats(
    session.user_id,
    new Date().toLocaleDateString('no-NO'),
  );
  const exercises: Exercises[] = await getExercises(query);

  return (
    <>
      <Stats exercises={exercises} stats={stats} />
    </>
  );
}
