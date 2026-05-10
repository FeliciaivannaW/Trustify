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
        {
          error: 'Text too short',
        },
        {
          status: 400,
        }
      );
    }

    const prompt = `
Anda adalah AI keamanan siber bernama Trustify.

Analisa teks berikut untuk mendeteksi scam,
phishing,
hoax,
atau penipuan.

Balas HANYA JSON valid:

{
  "score": 0,
  "riskLevel": "safe",
  "redFlags": [],
  "recommendations": []
}

Teks:
${text}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',

      contents: [
        {
          role: 'user',

          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const responseText = response.text;

    console.log('Gemini Response:', responseText);

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('No JSON found');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    const result = {
      score: parsed.score || 0,
      riskLevel: parsed.riskLevel || 'warning',
      redFlags: parsed.redFlags || [],
      recommendations: parsed.recommendations || [],
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
    console.error(error);

    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}