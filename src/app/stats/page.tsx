import { getStats } from '../lib/utils/stats';

export default async function Page() {
  const stats: any[] = await getStats();
  const heart = '❤️';
  return (
    <div>
      <h1>DAGENS STATS {heart}</h1>
      <div>
        {stats.map((stat) => (
          <h1></h1>
        ))}
      </div>
    </div>
  );
}
