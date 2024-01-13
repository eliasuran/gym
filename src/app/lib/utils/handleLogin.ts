export async function handleLogin(
  e: React.FormEvent<HTMLFormElement>,
  values: string[],
) {
  e.preventDefault();
  const [username, password] = values;
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data.user);
    } else {
      const data = await res.json();
      console.log(data.error);
    }
  } catch (error) {
    console.log(error);
  }
}
