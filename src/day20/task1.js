const _ = require('lodash');
const { splitTextToArray, readFile } = require("../shared.js");
const data = readFile('./day20/input.txt');
const dataArray = splitTextToArray(data);

const reverseBorder = border => border.split('').reverse().join('');

const tiles = dataArray.reduce((acc, value, index) => {
  if (value.includes('Tile')) {
    const id = Number(value.slice(5, -1));
    const tile = dataArray.slice(index + 1, index + 11);

    const topBorder = tile[0];
    const bottomBorder = tile[9];
    const { leftBorder, rightBorder } = tile.reduce((acc, val) => ({
      leftBorder: `${acc.leftBorder}${_.first(val)}`,
      rightBorder: `${acc.rightBorder}${_.last(val)}`,
    }), { leftBorder: '', rightBorder: '' });
    const borders = [topBorder, bottomBorder, leftBorder, rightBorder];
    const flippedBorders = borders.map(reverseBorder);

    acc.push({
      id,
      borders: [...borders, ...flippedBorders]
    });
  }

  return acc;
}, []);

const tilesWithNeighbours = tiles.map(tile => {
  const neighbours = tiles
    .filter((neighbourTile) => {
      if (neighbourTile.id !== tile.id) {
        return tile.borders.some(border => neighbourTile.borders.includes(border));
      }

      return false;
    })
    .map(n => n.id);
  return {
    ...tile,
    neighbours: _.uniq(neighbours),
  };
});

const cornerTiles = tilesWithNeighbours.filter(t => t.neighbours.length === 2);
const res = cornerTiles.reduce((acc, v) => acc * v.id, 1);

console.log(res);