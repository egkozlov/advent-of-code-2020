const getParenthesesIndexes = (line, parenthes) => line.split('')
  .map((v, i) => [v, i])
  .filter(([val,]) => val === parenthes)
  .map(([, i]) => i);

const getTopLevelParenthesesPairs = (line) => {
  let openingParenthesesIndexes = getParenthesesIndexes(line, '(');
  const closingParenthesesIndexes = getParenthesesIndexes(line, ')');

  const parenthesesPairs = closingParenthesesIndexes.map(closingParenthesIndex => {
    const beforeGoingOpeningParenthesesIndexes = openingParenthesesIndexes.filter(o => o < closingParenthesIndex);
    const openingParenthesesIndex = Math.max(...beforeGoingOpeningParenthesesIndexes);
    openingParenthesesIndexes = openingParenthesesIndexes.filter(o => o !== openingParenthesesIndex);
    return [openingParenthesesIndex, closingParenthesIndex];
  });

  return parenthesesPairs.filter(([start, end]) => !parenthesesPairs.some(([pStart, pEnd]) => pStart < start && pEnd > end));
};
const convertLineToArray = (line) => line.split(' ').map(v => ['+', '*'].includes(v) ? v : Number(v));
const computeEquationWihtoutParentheses = (lineItems) => {
  return lineItems.reduce((acc, currentValue, index) => {
    if (index === 0) {
      return currentValue;
    }

    if (currentValue === '+') {
      return acc + lineItems[index + 1];
    }

    if (currentValue === '*') {
      return acc * lineItems[index + 1];
    }

    return acc;
  }, 0);
};

module.exports = {
  getParenthesesIndexes,
  convertLineToArray,
  computeEquationWihtoutParentheses,
  getTopLevelParenthesesPairs,
}