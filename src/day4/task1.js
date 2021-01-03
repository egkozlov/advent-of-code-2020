const { splitTextToArray, readFile } = require("../shared.js");
const { getPassporst } = require("./shared.js");
const inputData = readFile("./day4/input.txt");
const data = splitTextToArray(inputData);

const passports = getPassporst(data);
const result = passports
  .map((passport) =>
    passport
      .split(" ")
      .map((pair) => pair.split(":"))
      .map(([key]) => key)
      .filter((k) => k !== "cid")
  )
  .filter((p) => p.length === 7).length;

console.log(`day4: task1: ${result}`);
