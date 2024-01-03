'use client';
import { useState } from 'react';
import LoginForm from '../login';

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin && <LoginForm setShowLogin={setShowLogin} />}
      <div className='relative w-full flex flex-col justify-center items-center gap-1'>
        <h1>{new Date().toLocaleDateString('no-NO')}</h1>
        <h1 className='absolute right-0' onClick={() => setShowLogin(true)}>
          Login
        </h1>
        <div className='w-full h-[1px] bg-text' />
      </div>
    </>
  );
}
