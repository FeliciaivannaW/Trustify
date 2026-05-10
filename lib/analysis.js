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

export function getRiskColor(score) {
  if (score >= 75) return 'var(--safe)';
  if (score >= 40) return 'var(--warning)';
  return 'var(--danger)';
}

export function getRiskClass(score) {
  if (score >= 75) return 'safe';
  if (score >= 40) return 'warning';
  return 'danger';
}
