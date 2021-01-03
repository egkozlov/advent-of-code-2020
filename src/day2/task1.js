const { readFile } = require("../shared.js");
const { splitTextToValues } = require("./shared.js");
const inputData = readFile('./day2/input.txt');
const values = splitTextToValues(inputData);
const filtered = values.filter(({ password, min, max, letter }) => {
  const lettersCount = password.split("").filter((l) => l === letter).length;
  return lettersCount >= min && lettersCount <= max;
});

console.log(`day2: task1: ${filtered.length}`);
