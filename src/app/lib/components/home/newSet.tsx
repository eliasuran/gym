import { Icon } from '@iconify/react';

export default function NewSet(props: { open: (show: boolean) => void }) {
  return (
    <button
      onClick={() => props.open(true)}
      className='btn btn-secondary grid place-items-center'
    >
      <Icon icon='akar-icons:plus' />
    </button>
  );
}
