import { GoogleGenAI, Modality } from "@google/genai";
import { Partner, Language, MoodId } from "../types";
import { SCRIPT_DB } from "../data/scriptData";

// Lazy initialization singleton
let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (ai) return ai;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("VITE_GEMINI_API_KEY is not set. Gemini features will be disabled.");
    return null;
  }

  ai = new GoogleGenAI({ apiKey });
  return ai;
};

export const generateMeltyAudio = async (
  userName: string,
  moodId: MoodId,
  partner: Partner,
  language: Language
): Promise<string | null> => {
  try {
    const client = getAIClient();
    if (!client) {
      // Rule: Interrupt/Skip if no key
      return null;
    }

    // 1. Select a random script from the chosen mood category
    const scripts = SCRIPT_DB[moodId]?.[language];
    if (!scripts || scripts.length === 0) {
      throw new Error(`No scripts found for mood: ${moodId} in language: ${language}`);
    }

    // Secure random selection
    const randomIndex = Math.floor(Math.random() * scripts.length);
    let scriptTemplate = scripts[randomIndex];

    // 2. Replace placeholders (e.g., {name}) with the user's name
    // If no name is provided, use a generic term
    const safeName = userName.trim() || (language === 'ja' ? '君' : 'you');
    const finalText = scriptTemplate.replace(/\{name\}/g, safeName);

    // Prompt Engineering for ASMR/Whisper Quality
    // We instruct the model to "act" rather than just read.
    const actingPrompt = `
[Direction: Speak in a very sweet, breathy, whispering voice. Act like a lover whispering into the listener's ear in bed. The goal is to create brain-melting ASMR tingles. Do not read the direction tag.]

${finalText}
`;

    // 3. Call Gemini TTS
    // Note: We only send the text for speech generation, no prompt engineering needed.
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: actingPrompt }] }],
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