export async function fetchData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_XOOM_BACKEND_URL}/api/settings`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'x-api-key': process.env.NEXT_PUBLIC_XOOM_API_KEY,
        },
      }
    );

    if (!res.ok) {
      console.log(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);

    throw error;
  }
}
