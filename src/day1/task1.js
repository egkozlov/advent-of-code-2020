const inputData = require("./input.txt");
const { splitTextToArray } = require("../shared.js");

const splitTextToIntArray = (txt) =>
  splitTextToArray(txt).map((n) => parseInt(n, 10));

const values = splitTextToIntArray(inputData);

let a;
let b;
for (let i = 0; i < values.length; i++) {
  for (let j = 0; j < values.length; j++) {
    if (values[i] + values[j] === 2020) {
      a = values[i];
      b = values[j];
    }
  }
}

const result = a * b;

console.log(`day1: task1: ${result}`);
