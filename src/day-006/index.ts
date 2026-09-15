/*

DAY 6 of AI Engineering - context window

----------------------------------------

The context window is what the model sees for a given call:

- input tokens (system prompt, messages)
- output tokens

As the conversation history gets longer, you will eventually hit the context window limit.

----------------------------------------

"LOST IN THE MIDDLE" Problem.

As the context window gets bigger, the start and end of the convo history tends to have a bigger impact on output,
whereas the messages in the middle get less attention. (Just something about LLMs..)

*/

/*

┌─────────────────────────────────────────────┐
│                                             │
│  TERMINAL AI CHAT APP                       │
│                                             │
│  Model: claude-sonnet-5                     │
│  Token cost: $2 input, $10 output (per 1M)  │
│  Context window: 1M tokens                  │
│                                             │
└─────────────────────────────────────────────┘

Assistant: Hello

You: who are u

Assistant: I'm an AI assistant made by Mitch Koko. ($0.0002)

You: tell me a joke

Assistant: Why did the dev go broke? Too many API calls. ($0.0003)

You: exit

┌──────────────────────────────────────────┐
│                                          │
│  CHAT ENDED                              │
│                                          │
│  Total cost: $0.0005                     │
│  Context window: 98 / 1M tokens (0.01%)  │
│                                          │
└──────────────────────────────────────────┘

*/

import Anthropic from "@anthropic-ai/sdk";
import * as readline from "node:readline/promises";
import { askClaude } from "./llm.js";
import { printGoodbye, printReply, printWelcome } from "./ui.js";
import { calculateCost } from "./usage.js";

// Read lines of input from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Conversation history
const messages: Anthropic.MessageParam[] = [];

// Running cost of the whole conversation
let totalCost = 0;

// How much of the context window the latest call used
let contextUsed = 0;

printWelcome();

// Main loop: keep chatting until the user types "exit"
while (true) {
  const input = await rl.question("\nYou: ");

  // Skip empty input and re-prompt
  if (input.trim() === "") continue;

  // Exit the loop (and the program) if the user types "exit"
  if (input.trim() === "exit") break;

  // Add the user's message to the conversation history
  messages.push({ role: "user", content: input });

  // Send conversation history to LLM and get a response
  const { reply, content, usage } = await askClaude(messages);

  // Add LLM's reply to the conversation history
  messages.push({ role: "assistant", content });

  // Cost of this turn, added to the running total
  const cost = calculateCost(usage);
  totalCost += cost;

  // Context used = everything the model saw + everything it wrote back
  contextUsed = usage.input_tokens + usage.output_tokens;

  printReply(reply, cost);
}

printGoodbye(totalCost, contextUsed);

// Close the readline interface once the loop ends
rl.close();
