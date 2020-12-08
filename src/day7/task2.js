const data = require("./input.txt");
const { splitTextToArray } = require("../shared.js");
const inputData = splitTextToArray(data).reduce((acc, bag) => {
  const v = bag.slice(0, -1).split(" ");
  const color = v.slice(0, 2).join(" ");
  const cypher = v.slice(2).join(" ");
  if (cypher.includes("no other bags")) {
    acc[color] = [];
    return acc;
  }

  const values = cypher.split(",").map((value) => {
    const res = value.split(" ").slice(-4).slice(0, 3);
    return {
      count: Number(res[0]),
      color: `${res[1]} ${res[2]}`
    };
  });

  acc[color] = values;
  return acc;
}, {});

console.log(inputData);
const searchedColor = "shiny gold";

const searchIncludes = (key) => {
  if (inputData[key].length === 0) {
    return 0;
  }

  let resV = 0;
  inputData[key].forEach(({ color, count }) => {
    resV += count + count * searchIncludes(color);
  });

  return resV;
};

const res = searchIncludes(searchedColor);

console.log(`day7: task2: ${res}`);
