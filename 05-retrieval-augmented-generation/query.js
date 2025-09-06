import { configDotenv } from "dotenv";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai";

configDotenv();

const main = async () => {
  // 1. Create embedding model
  const embedding = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    modelName: "text-embedding-004",
  });

  // 2. Connect to Qdrant
  const vectorStore = await QdrantVectorStore.fromExistingCollection(embedding, {
    url: "http://localhost:6333",
    collectionName: "learning_vectors",
  });

  // 3. Take user query
  const query = "Explain event loop in Node.js";

  // 4. Similarity search
  const results = await vectorStore.similaritySearch(query, 3);

  const context = results
    .map((r) => `Page Content: ${r.pageContent}\nPage Number: ${r.metadata?.page_label || "N/A"}`)
    .join("\n\n");

  // 5. Use Gemini as LLM
  const llm = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-1.5-flash",
  });

  const SYSTEM_PROMPT = `
   You are an AI assistant. Answer user queries **only** based on the following context:
${context}
`;

  const completion = await llm.invoke(`${SYSTEM_PROMPT}\nUser Query: ${query}`);

  console.log("🤖 Response:", completion?.content);
};

main();
