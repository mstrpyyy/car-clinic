


export async function GET_HTTP(url:string, params?: string, q?: Record<string, string>) {
  let query = ''
  if (q) {
    for (const key in q) {
      query += `${key}=${q[key]}&`
    }
  }

  try {
    const res = await fetch(`/api${url}${params ? `/${params}` : ''}?${query}`, {
      method: 'GET',
    });

    const data = await res.json();
    if (!res.ok) throw new Error('Error connecting with server');
    return data;

  } catch (error) {
      if (error instanceof Error) {
        return { message: error.message, status: false };
      }
  }
}