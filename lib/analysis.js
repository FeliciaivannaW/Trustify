// FILE: lib/analysis.js

export function getRiskColor(score) {
  const s = score ?? 0;
  if (s <= 30) return '#ef4444'; // danger - red
  if (s <= 60) return '#f59e0b'; // warning - amber
  return '#22c55e';              // safe - green
}

export function getRiskClass(score) {
  const s = score ?? 0;
  if (s <= 30) return 'danger';
  if (s <= 60) return 'warning';
  return 'safe';
}

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