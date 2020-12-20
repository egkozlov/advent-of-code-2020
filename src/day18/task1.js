const { splitTextToArray, readFile } = require("../shared.js");
const { convertLineToArray, computeEquationWihtoutParentheses, getTopLevelParenthesesPairs } = require("./shared.js");
const data = readFile('./day18/input.txt');
const dataArray = splitTextToArray(data);

const compute = (line) => {
  if (line.includes('(')) {
    const topLevelPairs = getTopLevelParenthesesPairs(line);
    topLevelPairs.reverse().forEach(([startIndex, endIndex]) => {
      const equationInParentheses = line.slice(startIndex + 1, endIndex);
      const res = compute(equationInParentheses);
      line = line.substring(0, startIndex) + res + line.substring(endIndex + 1);
    });

    return compute(line);
  }

  const lineItems = convertLineToArray(line);
  return computeEquationWihtoutParentheses(lineItems);
}

const res = dataArray.reduce((acc, val) => acc + compute(val), 0);
console.log(res)