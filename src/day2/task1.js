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
//   const lettersCount = password.split("").filter((l) => l === letter).length;
//   return lettersCount >= min && lettersCount <= max;
// });

// console.log(`day2: task1: ${filtered.length}`);
