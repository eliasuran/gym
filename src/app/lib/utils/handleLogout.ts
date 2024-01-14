export async function handleLogout() {
  try {
    const res = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (res.status === 200) {
      window.location.reload();
    } else {
      console.log(await res.json());
    }
  } catch (error) {
    console.error(error);
  }
}
