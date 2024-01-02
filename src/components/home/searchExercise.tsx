export default function SearchExercise() {
  return (
    <div className='bg-primary rounded-xl overflow-hidden'>
      <input
        className='h-12 w-full p-2 bg-primary outline-none'
        placeholder='Search for exercise'
      />
      <button className='h-12 w-full p-2 focus:bg-secondary outline-none'>
        Search result
      </button>
    </div>
  );
}
