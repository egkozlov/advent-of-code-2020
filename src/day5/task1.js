import { calcSeatId } from "./shared.js";
const { splitTextToArray } = require("../shared.js");
const inputData = require("./input.txt");

const data = splitTextToArray(inputData);
const maxSeatId = Math.max(...data.map(calcSeatId));

console.log(`day5: task1: ${maxSeatId}`);
