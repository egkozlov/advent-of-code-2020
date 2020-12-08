import { calculateMissed } from "./task2.js";

it("calculateMissed", () => {
  const input = [
    { command: "nop", sign: "+", value: 0 },
    { command: "acc", sign: "+", value: 1 },
    { command: "jmp", sign: "+", value: 4 },
    { command: "acc", sign: "+", value: 3 },
    { command: "jmp", sign: "-", value: 3 },
    { command: "acc", sign: "-", value: 99 },
    { command: "acc", sign: "+", value: 1 },
    { command: "jmp", sign: "-", value: 4 },
    { command: "acc", sign: "+", value: 6 }
  ];
  expect(calculateMissed(input)).toBe(8);
});
