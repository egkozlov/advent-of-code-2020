const _ = require('lodash');
const { splitTextToArray, readFile } = require("../shared.js");
const data = readFile('./day21/input.txt');
const dataArray = splitTextToArray(data);

const foodsList = dataArray.map((foodLine) => {
  const [ingridientsLine, allergensLine] = foodLine.slice(0, -1).split('(contains');
  const ingridients = ingridientsLine.trim().split(' ');
  const allergens = allergensLine.trim().split(',').map(_.trim);

  return { ingridients, allergens };
});

let ingridientListForAllergenMap = foodsList.reduce((acc, { ingridients, allergens }) => {
  allergens.forEach((allergen) => {
    if (acc[allergen]) {
      acc[allergen] = acc[allergen].filter(i => ingridients.includes(i));
    } else {
      acc[allergen] = [...ingridients];
    }
  });

  return acc;
}, {});

while (_.values(ingridientListForAllergenMap).some(s => s.length !== 1)) {
  const definedIngridients = _.flatten(_.values(ingridientListForAllergenMap).filter(v => v.length === 1));
  ingridientListForAllergenMap = _.mapValues(ingridientListForAllergenMap, ingridients =>
    ingridients.length === 1
      ? ingridients
      : ingridients.filter(i => !definedIngridients.includes(i)));
}

const allergensSortedList = _.sortBy(_.keys(ingridientListForAllergenMap));
const ingridientsList = allergensSortedList.map(key => _.head(ingridientListForAllergenMap[key])).join(',');
console.log(ingridientsList);