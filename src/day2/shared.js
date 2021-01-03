const { splitTextToArray } = require("../shared.js");

const splitTextToValues = (txt) =>
  splitTextToArray(txt).map((n) => {
    const [rule, password] = n.split(":").map((v) => v.trim());
    const [minMax, letter] = rule.split(" ");
    const [min, max] = minMax.split("-").map((v) => parseInt(v, 10));

    return {
      password,
      min,
      max,
      letter
    };
  });

module.exports.splitTextToValues = splitTextToValues;