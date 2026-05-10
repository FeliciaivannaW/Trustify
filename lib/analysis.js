export async function analyzeText(text, type) {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        text,
        type,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return null;
    }

    return data;

  } catch (error) {
    console.error(error);
    return null;
  }
}