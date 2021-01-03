const { splitTextToArray, readFile } = require("../shared.js");
const inputData = readFile("./day3/input.txt");
const values = splitTextToArray(inputData).map((n) => n.split(""));

const yMax = values.length;
const xMax = values[0].length;

const steps = [
  [3, 1],
  [1, 1],
  [5, 1],
  [7, 1],
  [1, 2]
];

const treesCount = ([stepX, stepY]) => {
  let x = 0;
  let y = 0;
  let result = 0;
  while (y < yMax) {
    x += stepX;
    y += stepY;
    if (values[y]) {
      const v = values[y][x % xMax];
      if (v === "#") {
        result++;
      }
    }
  }

  return result;
};

const result = steps.map(treesCount).reduce((acc, curr) => acc * curr, 1);

console.log(`day3: task2: ${result}`);
