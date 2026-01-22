import { GoogleGenAI, Type } from "@google/genai";
import { Ingredient } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-3-flash-preview for quick JSON generation
const MODEL_NAME = 'gemini-3-flash-preview';

interface GeneratedJuiceResponse {
  name: string;
  description: string;
  calories: number;
  benefits: string[];
  colorHex: string;
  priceEstimate: number;
}

export const generateJuiceDetails = async (ingredients: Ingredient[]): Promise<GeneratedJuiceResponse> => {
  if (ingredients.length === 0) {
    throw new Error("No ingredients selected");
  }

  const ingredientList = ingredients.map(i => i.name).join(', ');

  const prompt = `
    I am creating a custom juice blend with the following ingredients: ${ingredientList}.
    Please generate a catchy creative name for this juice, a short 1-sentence marketing description, 
    estimated calories per 16oz serving, 3 key health benefits, a suggested hex color code representing the final juice color,
    and a price estimate (USD) between 8 and 14 based on ingredient complexity.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Creative juice name" },
            description: { type: Type.STRING, description: "Marketing description" },
            calories: { type: Type.INTEGER, description: "Calories per 16oz" },
            benefits: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 3 health benefits"
            },
            colorHex: { type: Type.STRING, description: "Hex color code e.g. #FF5733" },
            priceEstimate: { type: Type.NUMBER, description: "Price in USD" }
          },
          required: ["name", "description", "calories", "benefits", "colorHex", "priceEstimate"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GeneratedJuiceResponse;
  } catch (error) {
    console.error("Gemini generation error:", error);
    // Fallback if AI fails
    return {
      name: "Custom Blend",
      description: "Your unique creation.",
      calories: 200,
      benefits: ["Hydration", "Vitamin Boost", "Custom Energy"],
      colorHex: "#FDBA74",
      priceEstimate: 10.00
    };
  }
};

export const streamNutritionAdvice = async (
  history: { role: string; text: string }[],
  userMessage: string
) => {
  const chatHistory = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));

  const chat = ai.chats.create({
    model: MODEL_NAME,
    history: chatHistory,
    config: {
      systemInstruction: "You are a friendly, energetic nutritionist at 'Vitality Press' juice bar. Keep answers short, punchy, and emoji-friendly. Recommend ingredients that we might have (Fruits, Veggies, Boosters). Do not give medical advice, but suggest healthy options."
    }
  });

  return await chat.sendMessageStream({ message: userMessage });
};