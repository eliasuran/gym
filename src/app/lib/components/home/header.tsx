'use client';
import { useState } from 'react';
import EntryForm from '../entryForm';
import { handleLogin } from '../../utils/handleLogin';
import { handleRegister } from '../../utils/handleRegister';
import { Input } from '../input';

export default function Header() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <>
      {showRegister && (
        <EntryForm
          handleSubmit={handleRegister}
          setShow={setShowRegister}
          values={[username, password, confirmPassword]}
          name='Register'
        >
          <Input
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            placeholder='Username'
            defaultValue=''
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            defaultValue=''
          />
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            placeholder='Confirm Password'
            defaultValue=''
          />
        </EntryForm>
      )}
      {showLogin && (
        <EntryForm
          handleSubmit={handleLogin}
          setShow={setShowLogin}
          values={[username, password]}
          name='Login'
        >
          <Input
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            placeholder='Username'
            defaultValue=''
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            defaultValue=''
          />
        </EntryForm>
      )}
      <div className='relative w-full flex flex-col justify-center items-center gap-1'>
        <h1>{new Date().toLocaleDateString('no-NO')}</h1>
        <div className='absolute right-0 flex gap-2'>
          <h1 onClick={() => setShowRegister(true)}>Register</h1>
          <h1 onClick={() => setShowLogin(true)}>Login</h1>
        </div>
        <div className='w-full h-[1px] bg-text' />
      </div>
    </>
  );
}
