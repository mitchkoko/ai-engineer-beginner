// Print a simple welcome box to the terminal
export function printWelcomeBox(title: string) {
  const padding = 2;
  const width = title.length + padding * 2;
  const top = `┌${"─".repeat(width)}┐`;
  const blank = `│${" ".repeat(width)}│`;
  const mid = `│${" ".repeat(padding)}${title}${" ".repeat(padding)}│`;
  const bottom = `└${"─".repeat(width)}┘`;

  console.log(top);
  console.log(blank);
  console.log(mid);
  console.log(blank);
  console.log(bottom);

  // First message
  console.log("\nAssistant: Hello");
}
