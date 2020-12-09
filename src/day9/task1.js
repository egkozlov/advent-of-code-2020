const { splitTextToArray } = require("../shared.js");
const data = require("./input.txt");
const numbers = splitTextToArray(data).map((n) => Number(n));

const isValueMissed = (arrayToCheck, value) => {
  let foundValue = false;
  for (let i = 0; i < preambleSize; i++) {
    for (let j = 0; j < preambleSize; j++) {
      if (i !== j && arrayToCheck[i] + arrayToCheck[j] === value) {
        foundValue = true;
        break;
      }
    }
  }

  return foundValue;
};

let res = null;
let index = 25;
const preambleSize = 25;

do {
  const valueToCheck = numbers[index];
  const startIndex = index - preambleSize;
  const arrayToCheck = numbers.slice(startIndex, index);
  if (!isValueMissed(arrayToCheck, valueToCheck)) {
    res = valueToCheck;
  }
  index += 1;
} while (res === null);

console.log(`day9: task2: ${res}`);
