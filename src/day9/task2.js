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

let startIndex = 0;
let resArray = [];

do {
  const numbersArray = numbers.slice(startIndex);
  let sum = 0;
  numbersArray.forEach((n, i) => {
    sum = sum + n;
    if (sum === res) {
      resArray = numbersArray.slice(0, i + 1);
    }
  });
  startIndex += 1;
} while (resArray.length === 0);

const min = Math.min(...resArray);
const max = Math.max(...resArray);
const weakness = min + max;

console.log(`day9: task2: ${weakness}`);
