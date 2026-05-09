export async function analyzeText(input, type = 'general') {
  if (!input || input.trim().length < 2) return null;

  try {
    let deviceId = typeof window !== 'undefined' ? localStorage.getItem('trustify_device_id') : 'anonymous';
    if (!deviceId && typeof window !== 'undefined') {
      deviceId = 'dev_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('trustify_device_id', deviceId);
    }

    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: input, type, deviceId }),
    });

    if (!response.ok) {
      console.error("API returned error:", response.status);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error analyzing text via backend:", error);
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
