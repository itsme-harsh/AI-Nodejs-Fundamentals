// import { configDotenv } from "dotenv";
// import OpenAI from "openai";
// configDotenv();

// const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// async function main() {
//     const text = "Nodejs is faster.";

//     try {
//         const response = await client.embeddings.create({
//             model: "text-embedding-3-small",
//             input: text,
//         })

//         const embedding = response.data[0].embedding;
//         console.log("Vector Embedding:", embedding);
//         console.log("Embedding Length:", embedding.length);
//     } catch (error) {
//         console.error("Error creating embedding:", error);
//     }
// }

// main();

import { configDotenv } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
configDotenv();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main() {
  const text = "Nodejs is faster.";

  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const response = await model.embedContent(text);

  console.log("object contains value array:", response.embedding);
  console.log("Vector Embedding:", response.embedding.values);
  console.log("Embedding Length:", response.embedding.values.length);
}

main().catch(console.error);
