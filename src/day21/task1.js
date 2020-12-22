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

const ingridientListForAllergenMap = foodsList.reduce((acc, { ingridients, allergens }) => {
  allergens.forEach((allergen) => {
    if (acc[allergen]) {
      acc[allergen] = acc[allergen].filter(i => ingridients.includes(i));
    } else {
      acc[allergen] = [...ingridients];
    }
  });

  return acc;
}, {});

const ingridientsContainedAllergens = _.uniq(_.flatten(_.values(ingridientListForAllergenMap)));
const allIngridients = _.flatMap(foodsList, food => food.ingridients);
const missingIngridients = allIngridients.filter(i => !ingridientsContainedAllergens.includes(i));
console.log(missingIngridients.length);
