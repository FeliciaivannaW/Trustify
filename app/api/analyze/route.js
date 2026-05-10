// FILE: app/api/analyze/route.js

import { GoogleGenAI } from '@google/genai';
import { supabase } from '../../../lib/supabase';

export const runtime = 'nodejs';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {
    const { text, type, deviceId } = await req.json();

    if (!text || text.length < 3) {
      return Response.json(
        { error: 'Text too short' },
        { status: 400 }
      );
    }

    const prompt = `
Anda adalah AI keamanan siber bernama Trustify.

Analisa teks berikut untuk mendeteksi scam, phishing, hoax, atau penipuan.

Berikan TRUST SCORE dari 0 hingga 100:
- 0-30 = BERBAHAYA (banyak tanda penipuan)
- 31-60 = MENCURIGAKAN (ada beberapa indikasi mencurigakan)
- 61-100 = AMAN (tidak ada tanda penipuan)

Balas HANYA JSON valid tanpa markdown, tanpa penjelasan tambahan:

{
  "score": <angka 0-100>,
  "riskLevel": "<safe|warning|danger>",
  "redFlags": ["<daftar masalah yang ditemukan, kosong jika aman>"],
  "recommendations": ["<saran tindakan untuk pengguna>"],
  "summary": "<ringkasan singkat 1-2 kalimat dalam Bahasa Indonesia>"
}

Pastikan:
- score dan riskLevel HARUS konsisten (danger=0-30, warning=31-60, safe=61-100)
- Jika teks tampak normal/aman, berikan score tinggi (misal 85-95)
- Jika jelas penipuan, berikan score rendah (misal 5-20)

Teks yang dianalisa:
${text}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    const responseText = response.text;
    console.log('Gemini Response:', responseText);

    // Strip possible markdown code fences
    const cleaned = responseText.replace(/```json|```/g, '').trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Normalize score to 0-100 range
    let score = Number(parsed.score) || 0;
    if (score < 0) score = 0;
    if (score > 100) score = 100;

    // Auto-fix riskLevel to be consistent with score
    let riskLevel = parsed.riskLevel || 'warning';
    if (score <= 30) riskLevel = 'danger';
    else if (score <= 60) riskLevel = 'warning';
    else riskLevel = 'safe';

    const result = {
      score,
      riskLevel,
      redFlags: parsed.redFlags || [],
      recommendations: parsed.recommendations || [],
      summary: parsed.summary || '',
    };

    await supabase.from('scans').insert({
      device_id: deviceId || 'anonymous',
      type,
      snippet: text.substring(0, 50),
      score: result.score,
      risk_level: result.riskLevel,
      red_flags: result.redFlags,
      recommendations: result.recommendations,
    });

    return Response.json(result);

  } catch (error) {
    console.error('Analyze API Error:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}