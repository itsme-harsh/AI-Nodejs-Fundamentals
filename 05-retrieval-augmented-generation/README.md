## 05 - Retrieval Augmented Generation (RAG) with Node.js

- RAG is the process of combining vector embeddings and language models (LLMs) to answer user queries based on external documents (like PDFs).

# Why RAG Matters?

✔ Provides context-aware answers
✔ Reduces hallucinations in LLM responses
✔ Works well for knowledge bases, manuals, and large documents
✔ Can guide users to exact sources/pages for more info

# Steps Implemented

1. Document Loading

- PDF documents are loaded using Node.js and split into manageable chunks for embeddings.
- Chunking ensures that each piece of text fits within the embedding model's context size.

2. Vector Embeddings

- OpenAI or Gemini embeddings are used to convert text chunks into vectors.
- Vectors are stored in Qdrant, a vector database for fast similarity search.

3. Querying & Similarity Search

- User query is converted to a vector using the same embeddings model.
- Qdrant performs a vector similarity search to find the most relevant hunks.
- Context is extracted from top results to pass to the LLM.

4. LLM Response with Gemini

- Google Gemini is used as the LLM to answer queries.
- It only answers based on the retrieved context, ensuring relevance.

5. Output

- The AI assistant provides answers along with page numbers and source info.

- Page Content: [Relevant text from PDF]
- Page Number: 5

# Example output:

🤖 Response: Node.js uses a single-threaded event loop to handle asynchronous operations. It's a continuous loop that monitors the event queue for events (like completing a network request or a timer expiring). When an event is ready, the event loop retrieves it and executes the corresponding callback function. This allows Node.js to handle multiple concurrent operations without needing multiple threads, improving efficiency and scalability.

✅ Best Practices

✔ Always chunk large documents for embedding
✔ Use context-based prompting to avoid hallucinations
✔ Store embeddings in a vector DB for fast retrieval
✔ Only provide LLMs with relevant context, never the whole PDF
