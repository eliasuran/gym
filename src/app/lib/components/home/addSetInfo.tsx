import { FaPlus } from 'react-icons/fa';

export default function AddSetInfo() {
  return (
    <div className='bg-secondary h-14 p-2 rounded-xl flex gap-2 items-center'>
      <input className='w-12 bg-secondary' type='number' placeholder='kg' />
      <input className='w-12 bg-secondary' type='number' placeholder='reps' />
      <button className='w-6 h-full text-sm rounded-lg bg-tertiary grid place-items-center'>
        <FaPlus />
      </button>
    </div>
  );
}
