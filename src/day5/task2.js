import { decode, getSeatId } from "./shared.js";
const inputData = require("./input.txt");
const { splitTextToArray } = require("../shared.js");

const generateAllSeats = () => {
  const allSeats = [];
  for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 8; j++) {
      allSeats.push(`${i}:${j}`);
    }
  }

  return allSeats;
};

const data = splitTextToArray(inputData);
const seats = data.map(decode).map(([row, column]) => `${row}:${column}`);
const allSeats = generateAllSeats();
const missingSeatIds = allSeats
  .filter((s) => !seats.includes(s))
  .map((s) => s.split(":"))
  .map(([r, c]) => getSeatId(r, c));

const missingSeatId = missingSeatIds.filter(
  (s) => !(missingSeatIds.includes(s + 1) || missingSeatIds.includes(s - 1))
);

console.log(`day5: task2: ${missingSeatId}`);
