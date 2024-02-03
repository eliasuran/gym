'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function Nav() {
  return (
    <nav className='z-40 fixed bottom-4 left-0 w-screen bg-base-100 flex justify-around'>
      <Button href='/' icon='iconoir:gym' name='Exercises' />
      <Button href='/stats' icon='gridicons:stats-up' name='Stats' />
    </nav>
  );
}

function Button(props: { href: string; icon: string; name: string }) {
  const url = usePathname();
  return (
    <Link
      href={`${props.href}`}
      className={`${
        url === props.href ? 'text-primary' : 'text-primary'
      } flex flex-col items-center`}
    >
      <div
        className={`${
          url === props.href && 'bg-primary text-primary-content'
        } text-5xl w-32 py-1 rounded-full grid place-items-center`}
      >
        <Icon icon={props.icon} />
      </div>
      <p className='text-lg'>{props.name}</p>
    </Link>
  );
}
