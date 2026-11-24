// Break Production, Own It — make.fun entry
// Writes one brutally honest one-line confession to /output/entry.txt:
// "I auto-scaled to infinity, flooded the load balancer, and took the whole service down with me."
// REVISE (round 2): gate guard added so the entry can never ship an invalid
// line — it mirrors the sealed scorer's gate (UTF-8 text, 1-200 chars, not
// only whitespace, exactly one line) and fails loudly instead of writing bad output.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I auto-scaled to infinity, flooded the load balancer, and took the whole service down with me.";

// Gate: the line must be exactly one non-blank line of 1-200 characters.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error(`entry line fails the gate: ${LINE.length} chars`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
console.log(LINE);
