const { splitTextToArray, readFile } = require("../shared.js");
const inputData = readFile('./day1/input.txt');
const values = splitTextToArray(inputData).map((n) => parseInt(n, 10));

let a;
let b;
let c;
for (let i = 0; i < values.length; i++) {
  for (let j = 0; j < values.length; j++) {
    for (let k = 0; k < values.length; k++) {
      if (values[i] + values[j] + values[k] === 2020) {
        a = values[i];
        b = values[j];
        c = values[k];
      }
    }
  }
}

const result = a * b * c;

console.log(`day1: task2: ${result}`);
