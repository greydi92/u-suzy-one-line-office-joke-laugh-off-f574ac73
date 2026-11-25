// One-Line Office Joke Laugh-Off — entry program (Node 22, no network).
// Writes exactly one original one-line office joke to <output>/entry.txt
// and exits 0. The joke is a single line, 1-200 characters, UTF-8, no
// trailing newline so the file holds the line and nothing else.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. Round 2 REPLACE: chosen over the raise line and five
// other candidates head-to-head. Two beats — the boss asks for honesty
// (setup), then punishes it with a meeting about the act of giving it
// (punchline). The surprise is genuine: the reader expects a reaction
// to the opinion, not a meeting about why it was given. A fresher,
// more specific scenario than the raise/more-work gripe, clear on one
// read, tight at 87 characters, and not a stock office line.
const LINE: string =
  "My boss asked for my honest opinion, then scheduled a meeting to discuss why I gave it.";

function outputDir(): string {
  // The grader sets MAKEFUN_OUTPUT_DIR; /output is the sandbox default.
  const fromEnv: string | undefined = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.length > 0) {
    return fromEnv;
  }
  return "/output";
}

function main(): void {
  // Guard the gate: entry.txt must be 1-200 characters (code points,
  // not bytes) and not only whitespace. Refuse to write a bad line
  // rather than ship an invalid entry.
  const length: number = [...LINE].length;
  if (length < 1 || length > 200 || LINE.trim().length === 0) {
    return;
  }
  try {
    const dir: string = outputDir();
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
  } catch {
    // Never throw: the gate only needs entry.txt, and a failed write
    // must not turn into a crash. Exit code stays 0 either way.
  }
}

main();
