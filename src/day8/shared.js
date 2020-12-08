const { splitTextToArray } = require("../shared.js");
export const generateCommandsArray = (data) =>
  splitTextToArray(data).map((c) => {
    const [command, value] = c.split(" ");
    return {
      command,
      sign: value.slice(0, 1),
      value: Number(value.slice(1))
    };
  });

export const performOperation = (acc, index, { command, sign, value }) => {
  if (command === "nop") {
    index += 1;
  } else if (command === "acc") {
    if (sign === "+") {
      acc += value;
    } else {
      acc -= value;
    }
    index += 1;
  } else if (command === "jmp") {
    if (sign === "+") {
      index += value;
    } else {
      index -= value;
    }
  }

  return { index, acc };
};
