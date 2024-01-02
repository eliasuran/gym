import NewSet from './newSet';
import AddSetInfo from './addSetInfo';

export default function Exercise() {
  return (
    <div className='bg-primary h-28 p-2 rounded-xl overflow-hidden text-center'>
      <h2>Exercise name</h2>
      <div className='flex flex-wrap gap-4 h-16 items-center'>
        <AddSetInfo />
        <NewSet />
      </div>
    </div>
  );
}
