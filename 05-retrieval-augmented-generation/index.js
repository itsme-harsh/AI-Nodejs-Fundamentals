import { configDotenv } from "dotenv";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai";

configDotenv();

const main = async () => {
  const loader = new PDFLoader("nodejs.pdf");
  // console.log(await loader.load()) // get pdf data
  const docs = await loader.load();

  // 2. Split into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 400,
  });

  const splitDocs = await splitter.splitDocuments(docs);

  // 3. Gemini embeddings
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    modelName: "text-embedding-004",
  });

  //store in qudrant
  await QdrantVectorStore.fromDocuments(splitDocs, embeddings, {
    url: "http://localhost:6333",
    collectionName: "learning_vectors",
  });
};

main();
