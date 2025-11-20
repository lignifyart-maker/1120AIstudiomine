
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MineralAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

// Schema for structured mineral analysis
const mineralSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    nameChinese: { type: Type.STRING, description: "Name of the mineral in Traditional Chinese (繁體中文)" },
    nameEnglish: { type: Type.STRING, description: "Name of the mineral in English" },
    chemicalFormula: { type: Type.STRING, description: "Chemical formula of the mineral" },
    confidenceLevel: { type: Type.INTEGER, description: "Confidence score between 0 and 100" },
    description: { type: Type.STRING, description: "Detailed scientific description of the mineral in Traditional Chinese (繁體中文)" },
    historicalStories: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "2 to 3 interesting historical stories, myths, or trivia related to this mineral in Traditional Chinese (繁體中文)" 
    },
    socialMediaTopics: {
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of popular discussion topics, memes, or myths often found on social media (like Threads, Reddit, Instagram) regarding this mineral (e.g., healing properties, market scams, color variations) in Traditional Chinese (繁體中文)"
    },
    identificationReasons: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING }, 
      description: "List of visual reasons why this mineral was identified, ordered by importance, in Traditional Chinese (繁體中文)" 
    },
    otherCandidates: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
            name: { type: Type.STRING, description: "Name of the alternative mineral in Traditional Chinese (繁體中文)" },
            confidence: { type: Type.INTEGER, description: "Confidence score for this alternative (must be lower than main confidence)" }
        }
      },
      description: "List of exactly 3 other possible minerals that this could be, with their confidence levels."
    },
    references: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          url: { type: Type.STRING },
          title: { type: Type.STRING },
          description: { type: Type.STRING, description: "Short description of the website in Traditional Chinese (繁體中文)" }
        }
      },
      description: "A list of real, valid reference websites for this mineral"
    }
  },
  required: ["nameChinese", "nameEnglish", "chemicalFormula", "confidenceLevel", "description", "historicalStories", "socialMediaTopics", "identificationReasons", "otherCandidates", "references"]
};

export const analyzeMineralImage = async (base64Image: string, mimeType: string): Promise<MineralAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: "Analyze this image and identify the mineral. Provide the output strictly in Traditional Chinese (繁體中文) (except for English name and Formula) according to the JSON schema. Ensure historical stories includes 2-3 distinct items. Ensure you list 3 other possible minerals."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: mineralSchema,
        temperature: 0.4, // Lower temperature for more factual accuracy
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as MineralAnalysis;
  } catch (error) {
    console.error("Error identifying mineral:", error);
    throw error;
  }
};

export const createMineralChat = (analysis: MineralAnalysis) => {
  const systemInstruction = `
    You are an expert mineralogist and geologist assistant. 
    The user has just analyzed an image which was identified as ${analysis.nameEnglish} (${analysis.nameChinese}).
    
    Here is the analysis context:
    - Description: ${analysis.description}
    - Formula: ${analysis.chemicalFormula}
    - History: ${analysis.historicalStories.join('; ')}
    - Social Topics: ${analysis.socialMediaTopics.join('; ')}
    - Other Possibilities: ${analysis.otherCandidates.map(c => `${c.name} (${c.confidence}%)`).join(', ')}
    
    Answer the user's follow-up questions about this specific mineral clearly and concisely in Traditional Chinese (繁體中文).
    Be helpful, educational, and friendly.
  `;

  return ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: systemInstruction,
    }
  });
};
