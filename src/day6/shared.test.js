import { getUniqueAnswersCount, getEqualAnswersCount } from "./shared.js";

it("getUniqueAnswersCount", () => {
  const testCases = [
    { input: ["abc"], output: 3 },
    { input: ["a", "b", "c"], output: 3 },
    { input: ["ab", "bcz"], output: 4 },
    { input: ["a", "a", "a", "a"], output: 1 },
    { input: ["b"], output: 1 }
  ];
  testCases.forEach(({ input, output }) => {
    expect(getUniqueAnswersCount(input)).toBe(output);
  });
});

it("getEqualAnswersCount", () => {
  const testCases = [
    { input: ["abc"], output: 3 },
    { input: ["a", "b", "c"], output: 0 },
    { input: ["ab", "bcz"], output: 1 },
    { input: ["a", "a", "a", "a"], output: 1 },
    { input: ["b"], output: 1 }
  ];
  testCases.forEach(({ input, output }) => {
    expect(getEqualAnswersCount(input)).toBe(output);
  });
});
