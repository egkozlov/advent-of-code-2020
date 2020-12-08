const data = require("./input.txt");
const { generateCommandsArray, performOperation } = require("./shared.js");

const commands = generateCommandsArray(data);

export const calculateAcc = (commands) => {
  const visitedIndexes = [];
  let acc = 0;
  let index = 0;

  do {
    visitedIndexes.push(index);
    const { index: newIndex, acc: newAcc } = performOperation(
      acc,
      index,
      commands[index]
    );

    index = newIndex;
    acc = newAcc;
  } while (!visitedIndexes.includes(index));

  return acc;
};

const acc = calculateAcc(commands);

console.log(`day8: task1: ${acc}`);
