// DAY 1 of AI Engineering

// let's use anthropic..
import Anthropic from "@anthropic-ai/sdk";

// give it your key..
const client = new Anthropic();

// talk to the llm!
const msg = await client.messages.create({
  model: "claude-sonnet-5",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello!" }],
});

// "Hi there! How can I help?"
console.log(msg.content);