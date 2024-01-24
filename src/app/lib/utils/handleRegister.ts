export async function handleRegister(
  e: React.FormEvent<HTMLFormElement>,
  values: string[],
) {
  e.preventDefault();
  const [username, password, confirmPassword] = values;
  if (password !== confirmPassword) {
    return console.log('Passwords do not match');
  }
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data.data);
    } else {
      console.log(await res.json());
    }
  } catch (error) {
    console.log(error);
  }
}