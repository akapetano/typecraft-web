import { describe, expect, it } from "vitest";
import { splitTextToWords } from "@/components/features/TypingTest/TypingTest.utils";

describe("splitTextToWords", () => {
  it("should split text into words with correct indices", () => {
    const result = splitTextToWords("hello world");
    expect(result).toEqual([
      { word: "hello", startIndex: 0 },
      { word: "world", startIndex: 6 },
    ]);
  });

  it("should handle single word", () => {
    const result = splitTextToWords("hello");
    expect(result).toEqual([{ word: "hello", startIndex: 0 }]);
  });

  it("should handle multiple spaces", () => {
    const result = splitTextToWords("hello  world");
    // Documents current behavior - might want to normalize spaces
    expect(result).toEqual([
      { word: "hello", startIndex: 0 },
      { word: "", startIndex: 6 },
      { word: "world", startIndex: 7 },
    ]);
  });

  it("should handle punctuation", () => {
    const result = splitTextToWords("hello, world!");
    expect(result).toEqual([
      { word: "hello,", startIndex: 0 },
      { word: "world!", startIndex: 7 },
    ]);
  });

  it("should handle empty string", () => {
    const result = splitTextToWords("");
    expect(result).toEqual([{ word: "", startIndex: 0 }]);
  });
});
