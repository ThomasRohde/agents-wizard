import { GoogleGenAI } from "@google/genai";

export const refineContent = async (currentContent: string, instructions: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are an expert software architect. 
    I have an AGENTS.md file that defines the coding standards for a project.
    
    Here is the current content:
    ---
    ${currentContent}
    ---
    
    Here are my additional instructions for refinement:
    ${instructions}
    
    Please rewrite and polish the AGENTS.md file. 
    - Maintain the existing structure but improve clarity and flow.
    - Merge redundant sections.
    - Fix any contradictions.
    - Keep the tone professional and authoritative.
    - Return ONLY the markdown content.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // High speed for interactive tools
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Speed over deep reasoning for simple text polishing
      }
    });
    
    return response.text || currentContent;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};