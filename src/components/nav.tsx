'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CgGym } from 'react-icons/cg';
import { MdOutlineQueryStats } from 'react-icons/md';

interface ButtonProps {
  name: string;
  icon: JSX.Element;
}

const Nav = () => {
  const Button = ({ name, icon }: ButtonProps) => {
    return (
      <Link
        href={`${name}`}
        className={`${
          usePathname() === name && 'bg-primary'
        } w-1/2 h-full text-4xl grid place-items-center`}
      >
        {icon}
      </Link>
    );
  };

  return (
    <nav className='fixed bottom-0 w-screen h-20 border-t border-primary flex'>
      <Button name='/' icon={<CgGym />} />
      <Button name='/stats' icon={<MdOutlineQueryStats />} />
    </nav>
  );
};

export default Nav;
