## 03 - Prompt Engineering

- Prompt engineering is the process of designing input prompts to guide the model's behavior and improve response accuracy.

✅ Why Prompt Engineering Matters?

✔ Helps the model give better, more accurate answers
✔ Reduces hallucination and irrelevant answers
✔ Essential for complex reasoning and multi-step tasks

✅ Types of Prompting Covered

1. Zero-Shot Prompting

- The model is given a direct question without any examples.

Example:
User: "Translate 'Hello' to Spanish"
Assistant: "Hola"

2. Few-Shot Prompting

- The model is given a few examples before the actual task to improve accuracy.

Example:
User: "Write a nodejs function to add two numbers"
Assistant: "const add = (a, b) => return a + b"

3. Chain of Thought (CoT)

- The model is asked to think step by step and explain its reasoning.
- Improves performance in math, logic, and reasoning tasks.

Example Steps: analyse → think → output → validate → result

# Best Practices

✔ Use system messages to define behavior
✔ Provide clear examples in few-shot prompting
✔ For reasoning tasks, always use CoT
✔ Keep responses structured (JSON, markdown) for downstream tasks
