export async function handleRegister(
  e: React.FormEvent<HTMLFormElement>,
  values: string[],
) {
  e.preventDefault();
  const username = values[0];
  const password = values[1];
  const confirmPassword = values[2];
  console.log(password, confirmPassword);
  if (password !== confirmPassword) {
    return console.log('Passwords do not match');
  }
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, confirmPassword }),
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data.res.rows[0]);
    } else {
      console.log(await res.json());
    }
  } catch (error) {
    console.log(error);
  }
}
