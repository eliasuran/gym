export async function handleRegister(
  e: React.FormEvent<HTMLFormElement>,
  values: string[],
) {
  e.preventDefault();
  const [username, password, confirmPassword] = values;
  if (password !== confirmPassword) {
    console.log('Passwords do not match');
    return { status: 400, error: 'Passwords do not match' };
  }
  if (password.length < 8) {
    console.log('Password must be at least 8 characters');
    return { status: 400, error: 'Password must be at least 8 characters' };
  }
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return await res.json();
  } catch (error) {
    return { status: 500, error: 'Internal server error' };
  }
}
