const data = require("./input.txt");
const { generateCommandsArray, performOperation } = require("./shared.js");

const commands = generateCommandsArray(data);

const calculateAcc = (commands) => {
  const visitedIndexes = [];
  let acc = 0;
  let index = 0;

  do {
    if (commands[index]) {
      visitedIndexes.push(index);
      const { index: newIndex, acc: newAcc } = performOperation(
        acc,
        index,
        commands[index]
      );

      index = newIndex;
      acc = newAcc;
    }
  } while (!(visitedIndexes.includes(index) || !commands[index]));

  return { acc, terminated: !commands[index] };
};

export const calculateMissed = (commands) => {
  let res;

  commands.forEach((commandValue, index) => {
    let commandToReplace;

    if (commandValue.command === "nop") {
      commandToReplace = "jmp";
    } else if (commandValue.command === "jmp") {
      commandToReplace = "nop";
    }

    if (commandToReplace) {
      const newCommands = [...commands];
      newCommands.splice(index, 1, {
        ...commandValue,
        command: commandToReplace
      });
      const { acc, terminated } = calculateAcc(newCommands);

      if (terminated) {
        res = acc;
      }
    }
  });

  return res;
};

const acc = calculateMissed(commands);

console.log(`day8: task2: ${acc}`);
