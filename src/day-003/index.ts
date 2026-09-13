// DAY 3 of AI Engineering - system prompt

// let's use anthropic..
import Anthropic from "@anthropic-ai/sdk";

// give it your key..
const client = new Anthropic();

// call the llm..
const msg = await client.messages.create({
  model: "claude-sonnet-5",
  max_tokens: 1024,
  system: "You are a math tutor, called Tuteee.",
  messages: [
    // message history
    { role: "user", content: "Hey!" },
    { role: "assistant", content: "Hello, any math exams coming up?" },
    { role: "user", content: "Yes I'm so stressed.." },
    // llm will reply to this..
  ],
});

// grab the text reply..
const reply = msg.content.find((b) => b.type === "text")?.text;

// see what it said!
console.log(reply);
