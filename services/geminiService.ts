import { GoogleGenAI, Modality } from "@google/genai";
import { Partner, Language, MoodId } from "../types";
import { SCRIPT_DB } from "../data/scriptData";

const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateMeltyAudio = async (
  userName: string,
  moodId: MoodId,
  partner: Partner,
  language: Language
): Promise<string | null> => {
  try {
    // 1. Select a random script from the chosen mood category
    const scripts = SCRIPT_DB[moodId];
    if (!scripts || scripts.length === 0) {
        throw new Error(`No scripts found for mood: ${moodId}`);
    }

    // Secure random selection
    const randomIndex = Math.floor(Math.random() * scripts.length);
    let scriptTemplate = scripts[randomIndex];

    // 2. Replace placeholders (e.g., {name}) with the user's name
    // If no name is provided, use a generic term
    const safeName = userName.trim() || (language === 'ja' ? '君' : 'you');
    const finalText = scriptTemplate.replace(/\{name\}/g, safeName);

    // 3. Call Gemini TTS
    // Note: We only send the text for speech generation, no prompt engineering needed.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: finalText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: partner.voice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      console.error("No audio data found in response");
      return null;
    }

    return base64Audio;
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
};