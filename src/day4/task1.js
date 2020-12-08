const inputData = require("./input.txt");
const { splitTextToArray } = require("../shared.js");

const data = splitTextToArray(inputData);
let passports = [];
let passport = "";

data.forEach((d) => {
  if (d === "") {
    passports.push(passport);
    passport = "";
  } else {
    if (passport) {
      passport += ` ${d}`;
    } else {
      passport = d;
    }
  }
});
passports.push(passport);

passports = passports
  .map((p) =>
    p
      .split(" ")
      .map((pair) => pair.split(":"))
      .map(([key]) => key)
      .filter((k) => k !== "cid")
  )
  .filter((p) => p.length === 7);

console.log(`day4: task1: ${passports.length}`);
