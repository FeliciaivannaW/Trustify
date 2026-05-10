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

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',

      contents: [
        {
          role: 'user',

          parts: [
            {
              text: `
Analisa gambar ini.

Deteksi apakah gambar tampak palsu,
hasil editan,
atau mencurigakan.

Balas HANYA JSON valid:

{
  "score": 0,
  "riskLevel": "safe",
  "redFlags": [],
  "recommendations": []
}
`,
            },

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

    console.log(responseText);

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('No JSON found');
    }

    const result = JSON.parse(jsonMatch[0]);

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