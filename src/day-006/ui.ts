import {
  CONTEXT_WINDOW_LABEL,
  INPUT_PRICE,
  MODEL,
  OUTPUT_PRICE,
} from "./config.js";
import { contextPercent } from "./usage.js";

// Print a simple box with a title and lines of text to the terminal
function printBox(title: string, ...lines: string[]) {
  const padding = 2;
  const inner = Math.max(title.length, ...lines.map((line) => line.length));
  const width = inner + padding * 2;
  const row = (text: string) =>
    `│${" ".repeat(padding)}${text.padEnd(inner)}${" ".repeat(padding)}│`;
  const top = `┌${"─".repeat(width)}┐`;
  const blank = `│${" ".repeat(width)}│`;
  const bottom = `└${"─".repeat(width)}┘`;

  console.log(top);
  console.log(blank);
  console.log(row(title));
  console.log(blank);
  for (const line of lines) console.log(row(line));
  console.log(blank);
  console.log(bottom);
}

// Welcome banner with the model, its token cost and its context window
export function printWelcome() {
  printBox(
    "TERMINAL AI CHAT APP",
    `Model: ${MODEL}`,
    `Token cost: $${INPUT_PRICE} input, $${OUTPUT_PRICE} output (per 1M)`,
    `Context window: ${CONTEXT_WINDOW_LABEL} tokens`,
  );

  // First message
  console.log("\nAssistant: Hello");
}

// Print reply in terminal, with this turn's cost
export function printReply(reply: string, cost: number) {
  console.log(`\nAssistant: ${reply} ($${cost.toFixed(4)})`);
}

// Goodbye banner with the whole conversation's cost and context usage
export function printGoodbye(totalCost: number, contextUsed: number) {
  console.log();
  printBox(
    "CHAT ENDED",
    `Total cost: $${totalCost.toFixed(4)}`,
    `Context window: ${contextUsed} / ${CONTEXT_WINDOW_LABEL} tokens (${contextPercent(contextUsed)}%)`,
  );
}
