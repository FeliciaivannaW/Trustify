import { GoogleGenAI } from '@google/genai';
import { supabase } from '../../../lib/supabase';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {
    const { text, type, deviceId } = await req.json();

    if (!text || text.length < 3) {
      return new Response(
        JSON.stringify({ error: 'Text too short' }),
        { status: 400 }
      );
    }

    const systemPrompt = `
Anda adalah AI pakar keamanan digital bernama Trustify.

Tugas Anda adalah menganalisis teks, link, atau review untuk mendeteksi penipuan, hoax, atau risiko siber.

Analisis input berikut dengan konteks tipe: ${type}.

Jika input berupa ketikan asal-asalan tanpa makna (gibberish), berikan score sangat rendah.

PENTING:
Balas HANYA dengan format JSON valid.
Jangan gunakan markdown.
Jangan tambahkan teks apapun di luar JSON.

Format JSON:

{
  "score": <angka 0-100>,
  "riskLevel": "<safe|warning|danger>",
  "redFlags": ["alasan 1", "alasan 2"],
  "recommendations": ["saran 1", "saran 2"]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'user',
          parts: [
            {
              text: `Teks untuk dianalisis:\n"${text}"`,
            },
          ],
        },
      ],
    });

    // FIX GEMINI RESPONSE
    const responseText =
      typeof response.text === 'function'
        ? response.text()
        : response.text;

    console.log('Gemini Raw Response:', responseText);

    let parsedResult;

    try {
      // ambil JSON aja walaupun ada teks tambahan
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error('No JSON found');
      }

      parsedResult = JSON.parse(jsonMatch[0]);

    } catch (e) {
      console.error('Failed to parse Gemini output:', responseText);

      return new Response(
        JSON.stringify({
          error: 'AI output parse error',
          raw: responseText,
        }),
        { status: 500 }
      );
    }

    // VALIDASI DEFAULT
    const safeResult = {
      score: parsedResult.score || 0,
      riskLevel: parsedResult.riskLevel || 'warning',
      redFlags: parsedResult.redFlags || [],
      recommendations: parsedResult.recommendations || [],
    };

    // SAVE TO SUPABASE
    const scanData = {
      device_id: deviceId || 'anonymous',
      type: type,
      snippet: text.substring(0, 50),
      score: safeResult.score,
      risk_level: safeResult.riskLevel,
      red_flags: safeResult.redFlags,
      recommendations: safeResult.recommendations,
    };

    supabase
      .from('scans')
      .insert(scanData)
      .then(({ error }) => {
        if (error) {
          console.error('Supabase insert error:', error);
        }
      });

    return new Response(JSON.stringify(safeResult), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('API Analyze Error:', error);

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
