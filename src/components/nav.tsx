'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CgGym } from 'react-icons/cg';
import { MdOutlineQueryStats } from 'react-icons/md';

export default function Nav() {
  function Button(props: { href: string; icon: JSX.Element }) {
    return (
      <Link
        href={`${props.href}`}
        className={`${
          usePathname() === props.href && 'bg-primary'
        } grow text-4xl grid place-items-center`}
      >
        {props.icon}
      </Link>
    );
  }

  return (
    <nav className='fixed bottom-0 w-screen h-20 border-t border-primary flex'>
      <Button href='/' icon={<CgGym />} />
      <Button href='/stats' icon={<MdOutlineQueryStats />} />
    </nav>
  );
}
