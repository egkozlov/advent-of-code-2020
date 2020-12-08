const data = require("./input.txt");
const { splitTextToArray } = require("../shared.js");
const inputData = splitTextToArray(data).map((bag) => {
  const v = bag.split(" ");
  const color = v.slice(0, 2).join(" ");
  const cypher = v.slice(2).join(" ");

  return [color, cypher];
});

const searchedColor = "shiny gold";

const searchIncludes = (arr, v, acc) => {
  let result = acc ? acc : [];
  arr.forEach(([color, cypher]) => {
    if (cypher.includes(v)) {
      result.push(color);
      searchIncludes(arr, color, result);
    }
  });

  return result;
};

let res = searchIncludes(inputData, searchedColor);

res = res.filter((x, i, a) => a.indexOf(x) === i);

console.log(`day7: task1: ${res.length}`);
