const { splitTextToArray, readFile } = require("../shared.js");
const inputData = readFile('./day1/input.txt');
const values = splitTextToArray(inputData).map((n) => parseInt(n, 10));

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
