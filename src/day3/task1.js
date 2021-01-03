const { splitTextToArray, readFile } = require("../shared.js");
const inputData = readFile("./day3/input.txt");
const values = splitTextToArray(inputData).map((n) => n.split(""));

let x = 0;
let y = 0;
let yMax = values.length;
let xMax = values[0].length;
let result = 0;

while (y < yMax) {
  x += 3;
  y += 1;
  if (values[y]) {
    const v = values[y][x % xMax];
    if (v === "#") {
      result++;
    }
  }
}

console.log(`day3: task1: ${result}`);
