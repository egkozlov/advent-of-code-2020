const inputData = require("./input.txt");
const { splitTextToArray } = require("../shared.js");

const splitTextToIntArray = (txt) =>
  splitTextToArray(txt).map((n) => parseInt(n, 10));

const values = splitTextToIntArray(inputData);

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
