const path = require("path");
const fs = require('fs');

const splitTextToArray = (txt) => txt.split("\n");
const readFile = (filePath) => fs.readFileSync(path.resolve(__dirname, filePath), 'utf8')

exports.splitTextToArray = splitTextToArray;
exports.readFile = readFile;
