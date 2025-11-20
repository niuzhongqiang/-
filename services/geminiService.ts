import { GoogleGenAI, Type, Schema } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A short, poetic, high-end title for the photograph." },
    moodDescription: { type: Type.STRING, description: "A sophisticated, artistic description of the image mood and composition (max 50 words)." },
    estimatedExif: {
      type: Type.OBJECT,
      properties: {
        camera: { type: Type.STRING, description: "Estimated camera model (e.g., Leica M11, Sony A7RV)." },
        lens: { type: Type.STRING, description: "Estimated lens (e.g., 35mm f/1.4)." },
        iso: { type: Type.STRING, description: "Estimated ISO value." },
        aperture: { type: Type.STRING, description: "Estimated aperture (f-stop)." },
        shutterSpeed: { type: Type.STRING, description: "Estimated shutter speed." },
      },
      required: ["camera", "lens", "iso", "aperture", "shutterSpeed"]
    },
    colorPalette: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Array of 3-4 hex color codes dominant in the image."
    }
  },
  required: ["title", "moodDescription", "estimatedExif", "colorPalette"]
};

export const analyzeImage = async (base64Image: string, mimeType: string = 'image/jpeg') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: "Analyze this photograph as a world-class art curator. Provide a sophisticated title, a poetic mood description, and estimate the technical camera settings used to achieve this look."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.4, // Lower temperature for more consistent/professional output
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};