## 01 - Tokenization in AI Models

Tokenization is the process of breaking text into smaller units (tokens) that AI models can understand. These tokens are then processed by the model for tasks like text generation, summarization, and question answering.

## Why Tokenization Matters?

- Large Language Models (LLMs) do not process raw text.
- They work on tokens, which are substrings or words converted into numbers.
- The number of tokens determines
  Cost: API charges are per token.
  Performance: context window size is in tokens, not characters.
  Example:
  "Hello, world!" → [9906, 11, 995] (3 tokens for GPT-4).

  If GPT-4 (8K) → $0.03 per 1K tokens (input), $0.06 per 1K tokens (output).

  Input cost @ $0.03 / 1K tokens
  3×0.03/1000=$0.00009
  3×0.03/1000=$0.00009 → $0.00009 (i.e., 0.009 cents)

  Output cost @ $0.06 / 1K tokens (if the model also generates 3 tokens)
  3×0.06/1000=$0.00018
  3×0.06/1000=$0.00018 → $0.00018 (i.e., 0.018 cents)

## Best Practices

✔ Always free memory with encoder.free().
✔ Know token limits for your model (e.g., GPT-4 = 128k tokens).
✔ Use tokenization before sending prompts to estimate cost.
