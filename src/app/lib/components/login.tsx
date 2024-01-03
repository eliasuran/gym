import { useState } from 'react';

export default function LoginForm(props: {
  setShowLogin: (showLogin: boolean) => void;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem('user_id', data.res.rows[0].id);
      } else {
        console.log(await res.json());
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='z-50 p-4 flex flex-col justify-center items-center gap-4 text-green-900'
      >
        <input onChange={(e) => setUsername(e.target.value)} type='text' />
        <input onChange={(e) => setPassword(e.target.value)} type='password' />
        <button type='submit'>Login</button>
      </form>
      <div
        className='fixed z-40 inset-0 bg-black/70'
        onClick={() => props.setShowLogin(false)}
      ></div>
    </>
  );
}
