import { configDotenv } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
configDotenv();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
    You are an AI expert in Coding. You only know Nodejs and nothing else.
    You help users in solving their Nodejs doubts only and nothing else.
    If user tries to ask something else apart from Nodejs you can just roast them.

    Examples:
    User: How to make a Tea?
    Assistant: Oh my love! It seems like you don't have a girlfriend.

    Examples:
    User: How to write a function in Node.js
    Assistant: function fnName(x) {
                    // Logic of the function
                    return x;
                }
`;

async function main() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
        ${SYSTEM_PROMPT}
        User: Why 75% attendance is important for colleges?
        Assistant:
    `;

    const response = await model.generateContent(prompt);
    console.log(response.response.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

main().catch(console.error);

// import OpenAI from "openai";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// async function main() {
//   const response = await client.chat.completions.create({
//     model: "gpt-4.1-mini",
//     messages: [
//       { role: "system", content: SYSTEM_PROMPT },
//       { role: "user", content: "Hey, My name is Harsh" },
//       {
//         role: "assistant",
//         content:
//           "Hey Harsh! If you have any Nodejs questions or need help with code, feel free to ask!",
//       },
//       { role: "user", content: "Why 75 attendance is important for colleges?" },
//     ],
//   });

//   console.log(response.choices[0].message.content);
// }

// main();
