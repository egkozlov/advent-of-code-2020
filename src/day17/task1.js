const { splitTextToArray, readFile } = require("../shared.js");
const data = readFile('./day17/input.txt');
const dataArray = splitTextToArray(data);

let activeElements = dataArray.reduce((acc, val, xIndex) => {
  const yValues = val.split('');
  yValues.forEach((yValue, yIndex) => {
    if (yValue === '#') {
      const key = `${xIndex},${yIndex},0`
      acc[key] = { x: xIndex, y: yIndex, z: 0 };
    }
  });
  return acc;
}, {});


const getNeighbours = (value) => {
  let res = {};
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      for (let k = -1; k < 2; k++) {
        if (!(i === 0 && j === 0 && k === 0)) {
          const x = value.x + i;
          const y = value.y + j;
          const z = value.z + k;
          const key = `${x},${y},${z}`;
          res[key] = { x, y, z };
        }
      }
    }
  }

  return res;
}

for (let i = 0; i < 6; i++) {
  let valuesToCheck = Object.entries(activeElements).reduce((acc, [key, value]) => {
    const n = getNeighbours(value);
    return { [key]: value, ...acc, ...n };
  }, {});

  let newActiveElements = Object.entries(valuesToCheck).reduce((acc, [key, value]) => {
    const isCurrentKeyActive = !!activeElements[key];
    const neighboursKeys = Object.entries(getNeighbours(value)).map(([key]) => key);

    const foundKeys = neighboursKeys.filter((key) => !!activeElements[key]).length;
    const shouldStayActive = isCurrentKeyActive && (foundKeys === 2 || foundKeys === 3);
    const shouldBecomeActive = !isCurrentKeyActive && foundKeys === 3;
    if (shouldStayActive || shouldBecomeActive) {
      return { ...acc, [key]: value };
    }

    return acc;
  }, {});

  activeElements = newActiveElements;
}

console.log(Object.entries(activeElements).length);