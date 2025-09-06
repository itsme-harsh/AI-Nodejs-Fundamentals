## 04 - AI Agent Tools

- AI Agent that follows a reasoning loop: plan → action → observe → output

# Built with Node.js and Gemini API.

- Uses external tools to perform real-world tasks.

✅ Why AI Agent Tools Matter?

✔ Automates reasoning and tool execution
✔ Can fetch live data (e.g., weather) or run system commands
✔ Helps in building real-world AI assistants

# Tools Covered

get_weather(city)

- Fetches real-time weather using wttr.in

Example:
User: "What is the weather in Rajkot?"
Assistant: "The weather in Rajkot is Sunny +30°C."

run_command(cmd)

- Executes Linux commands and returns output.

Example:
User: "Run pwd"
Assistant: "/home/username"

# Agent Workflow

Plan → Understand user intent
Action → Call the right tool
Observe → Collect tool output
Output → Return final response

Example Steps:
plan → action → observe → output

# Best Practices

✔ Always define available tools clearly in the system prompt
✔ Force model to output strict JSON for reliable parsing
✔ Handle invalid/multiple JSON outputs gracefully
✔ Watch out for free-tier rate limits in Gemini (50 requests/day/model)
