import { encoding_for_model } from "tiktoken";

async function main() {
  const encoder = await encoding_for_model("gpt-4o");
  const text = "hello, i am Harsh. I am a Node.js developer.";

  const tokens = encoder.encode(text);
  console.log("Tokens:", Array.from(tokens)); // Convert Uint32Array to array

  const decodedBytes = encoder.decode([
    15339, 11, 602, 1097, 5340, 939, 13, 358, 1097, 264, 6146, 2927, 16131, 13,
  ]);
  const decodedText = new TextDecoder().decode(decodedBytes);
  console.log("Decoded Text:", decodedText);

  encoder.free();
}

main();
