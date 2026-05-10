// FILE: app/api/imagetruth/route.js

import { GoogleGenAI } from '@google/genai';

export const runtime = 'nodejs';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get('image');

    if (!image) {
      return Response.json(
        { error: 'No image uploaded' },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');

    const prompt = `
Analisa gambar ini dengan cermat.

Deteksi apakah gambar screenshot transfer, resi, atau bukti pembayaran ini tampak palsu, hasil editan, atau mencurigakan.

Berikan TRUST SCORE dari 0 hingga 100:
- 0-30 = BERBAHAYA / kemungkinan besar palsu/diedit
- 31-60 = MENCURIGAKAN / ada beberapa indikasi tidak asli
- 61-100 = AMAN / tampak asli dan valid

Balas HANYA JSON valid tanpa markdown, tanpa penjelasan tambahan:

{
  "score": <angka 0-100>,
  "riskLevel": "<safe|warning|danger>",
  "redFlags": ["<tanda-tanda kecurigaan yang ditemukan, kosong jika aman>"],
  "recommendations": ["<saran tindakan untuk pengguna>"],
  "summary": "<ringkasan singkat 1-2 kalimat dalam Bahasa Indonesia>"
}

Pastikan score dan riskLevel HARUS konsisten:
- danger = score 0-30
- warning = score 31-60
- safe = score 61-100
`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: image.type,
                data: base64,
              },
            },
          ],
        },
      ],
    });

    const responseText = response.text;
    console.log('Gemini Image Response:', responseText);

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

    return Response.json({
      score,
      riskLevel,
      redFlags: parsed.redFlags || [],
      recommendations: parsed.recommendations || [],
      summary: parsed.summary || '',
    });

  } catch (error) {
    console.error('ImageTruth API Error:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}