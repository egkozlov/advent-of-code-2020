const { readFile } = require("../shared.js");
const { splitTextToValues } = require("./shared.js");
const inputData = readFile("./day2/input.txt");
const values = splitTextToValues(inputData);
const filtered = values.filter(({ password, min, max, letter }) => {
  const letters = password.split("");
  const firstLetterIsValid = letters[min - 1] === letter;
  const secondLetterIsValid = letters[max - 1] === letter;
  return (
    (firstLetterIsValid && !secondLetterIsValid) ||
    (!firstLetterIsValid && secondLetterIsValid)
  );
});

console.log(`day2: task2: ${filtered.length}`);
