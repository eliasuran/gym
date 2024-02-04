import SetClient from './setClient';

export default function Exercise(props: {
  exercise_id: string;
  exercise: string;
}) {
  return (
    <div className='bg-primary text-primary-content p-2 card overflow-hidden text-center'>
      <h2>{props.exercise}</h2>
      <SetClient exercise_id={props.exercise_id} />
    </div>
  );
}
