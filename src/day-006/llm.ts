import Anthropic from "@anthropic-ai/sdk";
import { MAX_TOKENS, MODEL, SYSTEM_PROMPT } from "./config.js";

// Anthropic API client
const client = new Anthropic();

// Send conversation history to LLM and get a response
export async function askClaude(messages: Anthropic.MessageParam[]) {
  const assistantResponse = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages,
  });

  // Find the text reply
  const reply =
    assistantResponse.content.find((b) => b.type === "text")?.text ?? "";

  return {
    reply,
    content: assistantResponse.content,
    usage: assistantResponse.usage,
  };
}
