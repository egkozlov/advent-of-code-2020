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

const values = dataArray.filter(v => !v.includes(':'));
const allowedStrings = _.flatten(rulesMap[0].value);
console.log(values.filter(v => allowedStrings.includes(v)).length);