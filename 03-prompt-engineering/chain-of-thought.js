import { configDotenv } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
configDotenv();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
    You are a helpful AI assistant who is specialized in resolving user queries.
    For the given user input, analyze the input and break down the problem step by step.

    Follow these steps: "analyse", "think", "output", "validate", and finally "result".

    Rules:
    1. Follow strict JSON output: { "step": "string", "content": "string" }
    2. Always perform one step at a time.
    3. Carefully analyze the user query.

    Example:
    Input: What is 2 + 2
    Output: { "step": "analyse", "content": "User is asking basic arithmetic" }
    Output: { "step": "think", "content": "I need to add 2 and 2" }
    Output: { "step": "output", "content": "4" }
    Output: { "step": "result", "content": "2 + 2 = 4" }
`;

async function main() {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `
        ${SYSTEM_PROMPT}
        User: What is 5 / 2 * 3 to the power 4
        Assistant: 
    `;

  try {
    const response = await model.generateContent(prompt);
    const steps = JSON.parse(response.response.candidates[0].content.parts[0].text);
    for (const step of steps) {
      console.log(`${step?.step}: ${step?.content}`);
    }
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

main().catch(console.error);

// import OpenAI from "openai";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// async function main() {
//   const messages = [
//     { role: "system", content: SYSTEM_PROMPT },
//     { role: "user", content: "What is 5 / 2 * 3 to the power 4" },
//   ];

//   const response = await client.chat.completions.create({
//     model: "gpt-4.1",
//     messages,
//     response_format: { type: "json_object" }
//   });

//   console.log(response.choices[0].message.content);
// }

// main();
