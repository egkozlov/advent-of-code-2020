const { splitTextToArray, readFile } = require("../shared.js");
const data = readFile('./day17/input.txt');
const dataArray = splitTextToArray(data);

let activeElements = dataArray.reduce((acc, val, x) => {
  const yValues = val.split('');
  yValues.forEach((yValue, y) => {
    if (yValue === '#') {
      const key = `${x},${y},0,0`;
      acc[key] = { x, y, z: 0, w: 0 };
    }
  });
  return acc;
}, {});

const getNeighbours = (value) => {
  let res = {};
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      for (let k = -1; k < 2; k++) {
        for (let h = -1; h < 2; h++) {
          if (![i, j, k, h].every(v => v === 0)) {
            const x = value.x + i;
            const y = value.y + j;
            const z = value.z + k;
            const w = value.w + h;
            const key = `${x},${y},${z},${w}`;
            res[key] = { x, y, z, w };
          }
        }
      }
    }
  }

  return res;
}

for (let i = 0; i < 6; i++) {
  const valuesToCheck = Object.entries(activeElements).reduce((acc, [key, value]) => {
    const n = getNeighbours(value);
    return { [key]: value, ...acc, ...n };
  }, {});

  let newActiveElements = Object.entries(valuesToCheck).reduce((acc, [key, value]) => {
    const isCurrentKeyActive = !!activeElements[key];
    const neighboursKeys = Object.entries(getNeighbours(value)).map(([key]) => key);

    const activeNeighboursCount = neighboursKeys.filter((key) => !!activeElements[key]).length;
    const shouldStayActive = isCurrentKeyActive && (activeNeighboursCount === 2 || activeNeighboursCount === 3);
    const shouldBecomeActive = !isCurrentKeyActive && activeNeighboursCount === 3;
    if (shouldStayActive || shouldBecomeActive) {
      return { ...acc, [key]: value };
    }

    return acc;
  }, {});

  activeElements = newActiveElements;
}

console.log(Object.entries(activeElements).length);