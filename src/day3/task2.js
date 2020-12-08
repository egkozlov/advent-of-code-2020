const inputData = require("./input.txt");
const { splitTextToArray } = require("../shared.js");

const splitTextToValues = (txt) =>
  splitTextToArray(txt).map((n) => n.split(""));
const values = splitTextToValues(inputData);
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
