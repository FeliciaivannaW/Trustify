import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {
    const formData = await req.formData();

    const image = formData.get('image');

    if (!image) {
      return new Response(
        JSON.stringify({
          error: 'No image uploaded',
        }),
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();

    const base64Image = Buffer.from(bytes).toString('base64');

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',

      contents: [
        {
          role: 'user',

          parts: [
            {
              text: `
Analisa gambar ini.

Deteksi apakah gambar screenshot transfer, bukti pembayaran, atau resi ini tampak palsu, editan, manipulasi, atau mencurigakan.

Balas HANYA JSON valid:

{
  "score": 0-100,
  "riskLevel": "safe/warning/danger",
  "redFlags": ["..."],
  "recommendations": ["..."]
}
`,
            },

            {
              inlineData: {
                mimeType: image.type,
                data: base64Image,
              },
            },
          ],
        },
      ],
    });

    const responseText =
      typeof response.text === 'function'
        ? await response.text()
        : response.text;

    console.log('Gemini Image Response:', responseText);

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('No JSON found');
    }

    const parsedResult = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(parsedResult), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('ImageTruth API Error:', error);

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
