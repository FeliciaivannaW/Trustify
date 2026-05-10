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
      return new Response(
        JSON.stringify({
          error: 'Text too short',
        }),
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',

      contents: [
        {
          role: 'user',

          parts: [
            {
              text: `
Anda adalah AI keamanan siber.

Analisa teks berikut.

Balas HANYA JSON valid:

{
  "score": 0-100,
  "riskLevel": "safe/warning/danger",
  "redFlags": ["..."],
  "recommendations": ["..."]
}
`,
            },
          ],
        },

        {
          role: 'user',

          parts: [
            {
              text: text,
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

    const parsedResult = JSON.parse(jsonMatch[0]);

    const safeResult = {
      score: parsedResult.score || 0,
      riskLevel: parsedResult.riskLevel || 'warning',
      redFlags: parsedResult.redFlags || [],
      recommendations: parsedResult.recommendations || [],
    };

    await supabase.from('scans').insert({
      device_id: deviceId || 'anonymous',
      type,
      snippet: text.substring(0, 50),
      score: safeResult.score,
      risk_level: safeResult.riskLevel,
      red_flags: safeResult.redFlags,
      recommendations: safeResult.recommendations,
    });

    return new Response(JSON.stringify(safeResult), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Analyze API Error:', error);

    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        details: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
