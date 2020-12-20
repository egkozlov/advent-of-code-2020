const _ = require('lodash');
const { getAllCombitations } = require("./shared.js");
const { splitTextToArray, readFile } = require("../shared.js");
const data = readFile('./day19/input.txt');
const dataArray = splitTextToArray(data);
const rules = dataArray.filter(v => v.includes(':'));

const rulesMap = rules.reduce((acc, ruleLine) => {
  const [ruleKey, ruleValue] = ruleLine.split(':');
  if (ruleValue.includes('"')) {
    acc[ruleKey] = {
      value: [ruleValue.trim().split('"').filter(v => !!v).join('')],
      filled: true,
    };
  } else {
    const rulesLines = ruleValue.trim().split('|').map(r => r.trim().split(' '));
    acc[ruleKey] = {
      value: ruleValue.trim(),
      filled: false,
      rulesLines,
    };
  }

  return acc;
}, {});

while (_.values(rulesMap).some(v => !v.filled)) {
  _.entries(rulesMap).forEach(([ruleKey, { filled, rulesLines }]) => {
    if (!filled && rulesLines.every(line => line.every(e => rulesMap[e].filled))) {
      const value = rulesLines.map((ruleLine) => getAllCombitations(...ruleLine.map((r) => _.flatten(rulesMap[r].value))));

      rulesMap[ruleKey] = {
        value,
        rulesLines,
        filled: true,
      };
    }
  });
}

const itemsToCheck = dataArray.filter(v => !!v && !v.includes(':'));
const firstPart = _.flatten(rulesMap[42].value);
const secondPart = _.flatten(rulesMap[31].value);
const step = _.head(firstPart).length;
if ([...firstPart, ...secondPart].some(p => p.length !== step)) {
  console.error('Our prediction is not correct. We expect that all parts will have the same length');
}

// string should match 42*k 42*n 31*n
const matchedStrings = itemsToCheck.filter(v => {
  if (v.length % step !== 0) {
    return false;
  }

  const substringsArray = v.match(/.{1,8}/g);
  const { firstCount, secondCount } = substringsArray.reduce((acc, substring) => {
    if (_.isEmpty(acc)) {
      return {}
    };

    const { firstCount, secondCount } = acc;
    const hasFirstPart = firstCount > 0;
    const hasSecondPart = secondCount > 0;
    if (!hasSecondPart && firstPart.includes(substring)) {
      return {
        firstCount: firstCount + 1,
        secondCount,
      };
    } else if (hasFirstPart) {
      if (secondPart.includes(substring)) {
        return {
          firstCount,
          secondCount: secondCount + 1,
        };
      }
    }

    return {};
  }, { firstCount: 0, secondCount: 0 });

  return firstCount && secondCount && (firstCount > secondCount);
});

console.log(matchedStrings.length);