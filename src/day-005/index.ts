// DAY 5 of AI Engineering - token usage & cost

/*

┌──────────────────────────┐
│                          │
│  TERMINAL AI CHAT APP    │
│                          │
│  Model: claude-sonnet-5  │
│                          │
└──────────────────────────┘

Assistant: Hello

You: who are u

Assistant: I'm an AI assistant made by Mitch Koko. ($0.0002)

You: tell me a joke

Assistant: Why did the dev go broke? Too many API calls. ($0.0003)

You: exit

┌───────────────────────┐
│                       │
│  CHAT ENDED           │
│                       │
│  Total cost: $0.0005  │
│                       │
└───────────────────────┘

*/

import Anthropic from "@anthropic-ai/sdk";
import * as readline from "node:readline/promises";
import { printGoodbyeBox, printWelcomeBox } from "./welcome.js";

// Anthropic API client
const client = new Anthropic();

// Read lines of input from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Model and its price in USD per 1M tokens
const MODEL = "claude-sonnet-5";
const INPUT_PRICE = 2;
const OUTPUT_PRICE = 10;

// Conversation history
const messages: Anthropic.MessageParam[] = [];

// Running cost of the whole conversation
let totalCost = 0;

// Welcome banner
printWelcomeBox("TERMINAL AI CHAT APP", `Model: ${MODEL}`);

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
  const assistantResponse = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: "Be extremely concise. You are an AI assistant made by Mitch Koko. Reply with as few words as possible.",
    messages,
  });

  // Add LLM's reply to the conversation history
  messages.push({ role: "assistant", content: assistantResponse.content });

  // Find the text reply
  const reply =
    assistantResponse.content.find((b) => b.type === "text")?.text ?? "";

  // Tokens used this turn (input includes the whole history we resent)
  const { input_tokens, output_tokens } = assistantResponse.usage;

  // Cost of this turn, added to the running total
  const cost =
    (input_tokens * INPUT_PRICE + output_tokens * OUTPUT_PRICE) / 1_000_000;
  totalCost += cost;

  // Print reply in terminal, with this turn's cost
  console.log(`\nAssistant: ${reply} ($${cost.toFixed(4)})`);
}

// Goodbye banner with the whole conversation's cost
printGoodbyeBox("CHAT ENDED", `Total cost: $${totalCost.toFixed(4)}`);

// Close the readline interface once the loop ends
rl.close();