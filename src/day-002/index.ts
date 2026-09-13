// DAY 2 of AI Engineering - message history

// let's use anthropic..
import Anthropic from "@anthropic-ai/sdk";

// give it your key..
const client = new Anthropic();

// call the llm!
const msg = await client.messages.create({
  model: "claude-sonnet-5",
  max_tokens: 1024,
  messages: [
    // message history
    { role: "user", content: "Hello! I'm learning about llms." },
    { role: "assistant", content: "Nice, how's that going?" },
    { role: "user", content: "Good! Write me a poem about it." },
    // llm will reply to this..
  ],
});

// grab the text reply..
const reply = msg.content.find((b) => b.type === "text")?.text;

// see what it said!
console.log(reply);
