import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const askTeacher = async (context: string, question: string): Promise<string> => {
  if (!ai) {
    return "API Key 未配置，老师无法回答问题。请联系管理员。";
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      你是一位亲切、耐心的小学一年级数学老师。
      正在上的课程是：11-20各数的认识及写法。
      当前的教学内容（上下文）是：${context}
      
      学生的问题是：${question}
      
      请用简单、生动、易懂的语言回答，字数不要太多（100字以内），多用鼓励的语气。
      如果有必要，可以用emoji。
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "老师正在思考...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "老师好像掉线了，请稍后再试一下。";
  }
};