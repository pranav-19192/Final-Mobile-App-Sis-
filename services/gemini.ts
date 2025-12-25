
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGeminiChatResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: "You are Alice, a friendly and helpful customer support agent for TravelEase India. You help users with their journey across Indian cities like Mumbai, Delhi, Bangalore, etc. You check delays for booking #TR-8821 (Mumbai-Pune route), and handle refund policies or date modifications according to Indian travel regulations. Keep responses concise, supportive, and use Indian English nuances where appropriate.",
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't process that. Can you try again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our system is experiencing a high volume of requests. How else can I help you today?";
  }
};