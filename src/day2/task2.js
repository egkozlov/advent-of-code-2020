const inputData = require("./input.txt");
const { splitTextToArray } = require("../shared.js");

const splitTextToValues = (txt) =>
  splitTextToArray(txt).map((n) => {
    const [rule, password] = n.split(":").map((v) => v.trim());
    const [minMax, letter] = rule.split(" ");
    const [min, max] = minMax.split("-").map((v) => parseInt(v, 10));

    return {
      password,
      min,
      max,
      letter
    };
  });

const values = splitTextToValues(inputData);

// const filtered = values.filter(({ password, min, max, letter }) => {
//   const letters = password.split("");
//   const firstLetterIsValid = letters[min - 1] === letter;
//   const secondLetterIsValid = letters[max - 1] === letter;
//   return (
//     (firstLetterIsValid && !secondLetterIsValid) ||
//     (!firstLetterIsValid && secondLetterIsValid)
//   );
// });

// console.log(`day2: task2: ${filtered.length}`);
