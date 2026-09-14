// DAY 4 of AI Engineering - terminal chat app

/*

┌────────────────────────┐
│                        │
│  TERMINAL AI CHAT APP  │
│                        │
└────────────────────────┘

Assistant: Hello

You: who are u

Assistant: I'm an AI assistant made by Mitch Koko. How can I help you?

You: ...

*/

import Anthropic from "@anthropic-ai/sdk";
import * as readline from "node:readline/promises";
import { printWelcomeBox } from "./welcome.js";

// Anthropic API client
const client = new Anthropic();

// Read lines of input from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Conversation history
const messages: Anthropic.MessageParam[] = [];

// Welcome banner
printWelcomeBox("TERMINAL AI CHAT APP");

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
    model: "claude-sonnet-5",
    max_tokens: 1024,
    system: "Be extremely concise. You are an AI assistant made by Mitch Koko.",
    messages,
  });

  // Add LLM's reply to the conversation history
  messages.push({ role: "assistant", content: assistantResponse.content });

  // Find the text reply
  const reply =
    assistantResponse.content.find((b) => b.type === "text")?.text ?? "";

  // Print reply in terminal
  console.log(`\nAssistant: ${reply}`);
}

// Close the readline interface once the loop ends
rl.close();