'use client';
import { useState } from 'react';
import EntryForm from '../entryForm';
import { handleLogin } from '../../utils/handleLogin';
import { handleRegister } from '../../utils/handleRegister';
import { handleLogout } from '../../utils/handleLogout';
import type { Session } from '../../types/session';

export default function Header(props: { session: Session }) {
  const { session } = props;
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <>
      <div className='relative w-full flex flex-col justify-center items-center gap-1'>
        <div className='absolute right-0 flex gap-2'>
          {session ? (
            <h1 onClick={handleLogout}>Logout</h1>
          ) : (
            <>
              {showLogin && (
                <EntryForm
                  handleSubmit={handleLogin}
                  setShow={setShowLogin}
                  setShowOpposite={setShowRegister}
                  values={[username, password]}
                  name='Login'
                >
                  <InputField
                    setValue={setUsername}
                    type='text'
                    placeholder='Username'
                  />
                  <InputField
                    setValue={setPassword}
                    type='password'
                    placeholder='Password'
                  />
                </EntryForm>
              )}
              {showRegister && (
                <EntryForm
                  handleSubmit={handleRegister}
                  setShow={setShowRegister}
                  setShowOpposite={setShowLogin}
                  values={[username, password, confirmPassword]}
                  name='Register'
                >
                  <InputField
                    setValue={setUsername}
                    type='text'
                    placeholder='Username'
                  />
                  <InputField
                    setValue={setPassword}
                    type='password'
                    placeholder='Password'
                  />
                  <InputField
                    setValue={setConfirmPassword}
                    type='password'
                    placeholder='Confirm Password'
                  />
                </EntryForm>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

const InputField = (props: {
  setValue: (e: string) => void;
  type: string;
  placeholder: string;
}) => {
  return (
    <input
      onChange={(e) => props.setValue(e.target.value)}
      type={props.type}
      placeholder={props.placeholder}
      defaultValue=''
      className='p-1 text-sm input input-primary input-sm'
    />
  );
};
