// Print a simple box with a title and a subtitle to the terminal
function printBox(title: string, subtitle: string) {
  const padding = 2;
  const inner = Math.max(title.length, subtitle.length);
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
  console.log(row(subtitle));
  console.log(blank);
  console.log(bottom);
}

// Welcome box shown when the app starts
export function printWelcomeBox(title: string, subtitle: string) {
  printBox(title, subtitle);

  // First message
  console.log("\nAssistant: Hello");
}

// Goodbye box shown when the user exits
export function printGoodbyeBox(title: string, subtitle: string) {
  console.log();
  printBox(title, subtitle);
}
