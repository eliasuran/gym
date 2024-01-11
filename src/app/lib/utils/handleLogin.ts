export async function handleLogin(
  e: React.FormEvent<HTMLFormElement>,
  values: string[],
) {
  e.preventDefault();
  const username = values[0];
  const password = values[1];
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
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
