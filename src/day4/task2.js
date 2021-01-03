const { splitTextToArray, readFile } = require("../shared.js");
const { getPassporst } = require("./shared.js");
const inputData = readFile("./day4/input.txt");
const data = splitTextToArray(inputData);

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.

const inRange = (v, min, max) => Number(v) >= min && Number(v) <= max;
const validationRules = {
  byr: (v) => inRange(v, 1920, 2002),
  iyr: (v) => inRange(v, 2010, 2020),
  eyr: (v) => inRange(v, 2020, 2030),
  hgt: (v) => {
    const dimension = v.slice(-2);
    const value = v.slice(0, -2);
    if (dimension === "cm") {
      return inRange(value, 150, 193);
    } else if (dimension === "in") {
      return inRange(value, 59, 76);
    }

    return false;
  },
  hcl: (v) => /^#([0-9A-F]{3}){1,2}$/i.test(v),
  ecl: (v) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(v),
  pid: (v) => v.split("").length === 9
};

const passports = getPassporst(data);
const result = passports
  .map((passport) =>
    passport
      .split(" ")
      .map((pair) => pair.split(":"))
      .filter(([k]) => k !== "cid")
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {})
  )
  .filter((p) => Object.keys(p).length === 7)
  .filter((p) =>
    Object.entries(p).every(([key, value]) => validationRules[key](value))
  )
  .length;

console.log(`day4: task2: ${result}`);
