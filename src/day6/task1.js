const data = require("./input.txt");
const { getUniqueAnswersCount, getAnswersGroups } = require("./shared.js");
const groups = getAnswersGroups(data);

const sum = groups.reduce(
  (res, group) => res + getUniqueAnswersCount(group),
  0
);

console.log(`day6: task1: ${sum}`);
