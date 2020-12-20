const { splitTextToArray, readFile } = require("../shared.js");
const { convertLineToArray, computeEquationWihtoutParentheses, getTopLevelParenthesesPairs } = require("./shared.js");
const data = readFile('./day18/input.txt');
const dataArray = splitTextToArray(data);

const excludeAddition = (lineItems) => {
  return lineItems.reduce((acc, currentValue, index) => {
    const previousAccValue = acc[acc.length - 1];
    if (index === 0) {
      acc.push(currentValue);
      return acc;
    }

    if (currentValue === '+') {
      acc[acc.length - 1] = previousAccValue + lineItems[index + 1];
      return acc;
    }

    if (currentValue === '*') {
      acc.push('*');
      return acc;
    }

    if (previousAccValue === '*') {
      acc.push(currentValue);
    }

    return acc;
  }, []);
}

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
  const lineItemsWithMultiplyOnly = excludeAddition(lineItems);
  return computeEquationWihtoutParentheses(lineItemsWithMultiplyOnly);
}

const res = dataArray.reduce((acc, val) => acc + compute(val), 0);
console.log(res)