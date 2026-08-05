import { describe, it, expect } from "vitest";

// ---------------------------------------------
// NOTE: Since calculateEntropy, looksRandom, and mask are not
// currently "exported" from SecretScanner.ts, add "export" in
// front of each of those 3 functions in that file first:
//
//   export function calculateEntropy(text: string): number { ... }
//   export function looksRandom(text: string): boolean { ... }
//   export function mask(text: string): string { ... }
//
// Then this import will work correctly.
// ---------------------------------------------
import { calculateEntropy, looksRandom, mask } from "./SecretScanner";

// ---------------------------------------------
// WHY TEST THESE 3 FUNCTIONS SPECIFICALLY?
// These are the "brains" of the scanner — the actual decision
// logic. The regex patterns are just string matching, but these
// functions decide "is this really random?" and "how do I hide
// this safely?". If these break, the whole tool gives wrong
// answers, so they deserve the most testing attention.
// ---------------------------------------------

describe("calculateEntropy", () => {

  it("gives a low score for repeated characters", () => {
    // "aaaaaaaa" has zero randomness — same letter every time
    expect(calculateEntropy("aaaaaaaa")).toBeLessThan(1);
  });

  it("gives a high score for random-looking text", () => {
    // Mixed upper/lower/numbers with no pattern = looks random
    expect(calculateEntropy("aB3xQ9zM")).toBeGreaterThan(2.5);
  });

});

describe("looksRandom", () => {

  it("says normal words are NOT random", () => {
    expect(looksRandom("dailyStandupMeeting")).toBe(false);
    expect(looksRandom("user-authentication-service")).toBe(false);
  });

  it("says real-looking secrets ARE random", () => {
    expect(looksRandom("a1B9xQ7mP3zK8vN2wR5")).toBe(true);
  });

});

describe("mask", () => {

  it("hides the middle of a long secret, keeps start and end visible", () => {
    const result = mask("AKIAIOSFODNN7EXAMPLE");
    // Should start with the first 4 real characters
    expect(result.startsWith("AKIA")).toBe(true);
    // Should end with the last 2 real characters
    expect(result.endsWith("LE")).toBe(true);
    // Should contain masking stars somewhere in the middle
    expect(result).toContain("*");
  });

  it("never reveals the full original secret", () => {
    const secret = "dummy_test_secret_1234567890abcdef";
    const result = mask(secret);
    expect(result).not.toBe(secret);
  });

  it("fully masks very short strings instead of showing them", () => {
    // If the string is too short, showing "start + end" would
    // basically show the whole thing — so we just mask it all.
    const result = mask("abc123");
    expect(result).toBe("******");
  });

});