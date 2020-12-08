const calcNewRange = ({ range, letter, minLetter, maxLetter }) => {
  const [min, max] = range;
  const step = (max - min + 1) / 2;
  if (letter === minLetter) {
    return [min, max - step];
  } else if (letter === maxLetter) {
    return [min + step, max];
  }
};

const decodeBase = ({ initialRange, code, minLetter, maxLetter }) => {
  const codeLetters = code.split("");
  return codeLetters.reduce(
    (range, letter) => calcNewRange({ range, letter, minLetter, maxLetter }),
    initialRange
  )[0];
};

const decodeRow = (code) =>
  decodeBase({
    code,
    initialRange: [0, 127],
    minLetter: "F",
    maxLetter: "B"
  });

const decodeColumn = (code) =>
  decodeBase({
    code,
    initialRange: [0, 7],
    minLetter: "L",
    maxLetter: "R"
  });

export const decode = (code) => {
  const rowCode = code.slice(0, -3);
  const columnCode = code.slice(-3);
  return [decodeRow(rowCode), decodeColumn(columnCode)];
};

export const getSeatId = (row, column) => {
  return Number(row) * 8 + Number(column);
};
export const calcSeatId = (code) => {
  const [row, column] = decode(code);
  return getSeatId(row, column);
};
