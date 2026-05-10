import { GoogleGenAI } from '@google/genai';
import { supabase } from '../../../lib/supabase';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  try {
    const { text, type, deviceId } = await req.json();

    if (!text || text.length < 3) {
      return new Response(JSON.stringify({ error: 'Text too short' }), { status: 400 });
    }

    const systemPrompt = `Anda adalah AI pakar keamanan digital bernama Trustify. Tugas Anda adalah menganalisis teks, link, atau review untuk mendeteksi penipuan, hoax, atau risiko siber.
Analisis input berikut dengan konteks tipe: ${type}.
Jika input berupa ketikan asal-asalan tanpa makna (gibberish), berikan score sangat rendah.
PENTING: Balas HANYA dengan format JSON valid berikut (tanpa markdown blok), jangan tambahkan teks apapun di luar JSON:
{
  "score": <angka 0-100, 100 aman, 0 sangat berbahaya>,
  "riskLevel": <"safe" jika score >= 75, "warning" jika score 40-74, "danger" jika score < 40>,
  "redFlags": [<array string alasan kenapa berbahaya atau mencurigakan>],
  "recommendations": [<array string saran tindakan mitigasi>]
}`;

    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [
            { role: 'user', parts: [{ text: systemPrompt }] },
            { role: 'user', parts: [{ text: `Teks untuk dianalisis:\n"${text}"` }] }
        ]
    });

    const responseText = response.text().trim();
    console.log("Gemini Raw Response:", responseText);
    let parsedResult;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error("No JSON found");
    }
    parsedResult = JSON.parse(jsonMatch[0]);
    } catch (e) {
        console.error("Failed to parse Gemini output:", responseText);
        return new Response(JSON.stringify({ error: 'AI output parse error' }), { status: 500 });
    }

    const scanData = {
        device_id: deviceId || 'anonymous',
        type: type,
        snippet: text.substring(0, 50),
        score: parsedResult.score,
        risk_level: parsedResult.riskLevel,
        red_flags: parsedResult.redFlags,
        recommendations: parsedResult.recommendations
    };

    // Save to Supabase (Background, don't wait for it to finish)
    supabase.from('scans').insert(scanData).then(({ error }) => {
        if (error) console.error("Supabase insert error:", error);
    });

    return new Response(JSON.stringify(parsedResult), { status: 200 });

  } catch (error) {
    console.error("API Analyze Error:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
