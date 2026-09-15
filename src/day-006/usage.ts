import Anthropic from "@anthropic-ai/sdk";
import { CONTEXT_WINDOW, INPUT_PRICE, OUTPUT_PRICE } from "./config.js";

// Cost of one turn in USD
export function calculateCost({ input_tokens, output_tokens }: Anthropic.Usage) {
  return (input_tokens * INPUT_PRICE + output_tokens * OUTPUT_PRICE) / 1_000_000;
}

// How full the context window got, as a percentage
export function contextPercent(contextUsed: number) {
  return ((contextUsed / CONTEXT_WINDOW) * 100).toFixed(2);
}
