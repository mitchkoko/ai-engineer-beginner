// Model and its price in USD per 1M tokens
export const MODEL = "claude-sonnet-5";
export const INPUT_PRICE = 2;
export const OUTPUT_PRICE = 10;

// Most tokens the model can see in one call (system prompt + messages + reply)
export const CONTEXT_WINDOW = 1_000_000;

// Context window written short, e.g. "1M"
export const CONTEXT_WINDOW_LABEL = `${CONTEXT_WINDOW / 1_000_000}M`;

// Most tokens the model can write back in one reply
export const MAX_TOKENS = 1024;

// Instructions sent with every call
export const SYSTEM_PROMPT =
  "Be extremely concise. You are an AI assistant made by Mitch Koko. Reply with as few words as possible.";
