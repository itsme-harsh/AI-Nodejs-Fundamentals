import { configDotenv } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
import { execSync } from "child_process";
import readline from "readline";

configDotenv();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const availableTools = {
  get_weather: async (city) => {
    try {
      const res = await fetch(`https://wttr.in/${city}?format=%C+%t`);
      const text = await res.text();
      return `The weather in ${city} is ${text}`;
    } catch {
      return "Something went wrong";
    }
  },
  run_command: (cmd) => {
    try {
      return execSync(cmd).toString().trim();
    } catch (err) {
      return err.message;
    }
  },
};

const SYSTEM_PROMPT = `
    You are an AI assistant that follows these steps: start -> plan -> action -> observe -> output.
    Use only the available tools when needed.
    Output strictly in JSON:
    {
      "step": "string",
      "content": "string",
      "function": "string if action",
      "input": "string if action"
    }

    Tools:
    - "get_weather": returns weather for a city
    - "run_command": executes a Linux command

    Example:
    User Query: What is the weather in New York?
    Output: {"step":"plan","content":"User wants weather for New York"}
    Output: {"step":"action","function":"get_weather","input":"New York"}
    Output: {"step":"observe","content":"12°C"}
    Output: {"step":"output","content":"The weather in New York is 12°C"}
`;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  const userQuery = await askQuestion("> ");

  let history = `
        ${SYSTEM_PROMPT}
        User Query: ${userQuery}
    `;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro",
    generationConfig: { responseMimeType: "application/json" },
  });

  let stepCompleted = false;

  while (!stepCompleted) {
    const response = await model.generateContent(history);
    const jsonContent = response.response.candidates[0].content.parts[0].text;
    let steps = JSON.parse(jsonContent);

    console.log("DEBUG STEP:", steps);

    for (const step of steps) {
      console.log("DEBUG STEP:", step);

      if (step.step === "plan") {
        console.log("🧠:", step.content);
        history += `Assistant Step: ${JSON.stringify(step)}\n`;
      }

      if (step.step === "action") {
        console.log(`🛠️ Action: Calling ${step.function} with input ${step.input}`);
        const output = await availableTools[step.function](step.input);
        history += `Assistant Step: ${JSON.stringify(step)}\nUser Observation: ${output}\n`;
      }

      if (step.step === "output") {
        console.log("🤖:", step.content);
        stepCompleted = true;
      }
    }
  }

  rl.close();
}

main();
