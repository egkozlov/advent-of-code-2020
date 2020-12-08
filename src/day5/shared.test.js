import { calcSeatId } from "./shared.js";

it("works", () => {
  const testCases = [
    { input: "BFFFBBFRRR", output: 567 },
    { input: "FFFBBBFRRR", output: 119 },
    { input: "BBFFBBFRLL", output: 820 }
  ];
  testCases.forEach(({ input, output }) => {
    expect(calcSeatId(input)).toBe(output);
  });
});
