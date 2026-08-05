import { describe, it, expect } from "vitest";


import { calculateEntropy, looksRandom, mask } from "./SecretScanner";



describe("calculateEntropy", () => {

  it("gives a low score for repeated characters", () => {
    expect(calculateEntropy("aaaaaaaa")).toBeLessThan(1);
  });

  it("gives a high score for random-looking text", () => {
   
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
    
    expect(result.startsWith("AKIA")).toBe(true);
    
    expect(result.endsWith("LE")).toBe(true);
    
    expect(result).toContain("*");
  });

  it("never reveals the full original secret", () => {
    const secret = "dummy_test_secret_1234567890abcdef";
    const result = mask(secret);
    expect(result).not.toBe(secret);
  });

  it("fully masks very short strings instead of showing them", () => {

    const result = mask("abc123");
    expect(result).toBe("******");
  });

});