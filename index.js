import { GameOfLife } from './game-of-life.class';


function generateBinary(dimension) {
  let bin = "", dim = dimension * dimension;

  (function rek() {
    const n = Math.floor((Math.random() * Number.MAX_SAFE_INTEGER) + 1);
    bin += n.toString(2);

    if (bin.length < dim) rek();
  })();

  return bin.slice(0, dim)
}

const dimension = 30;
const binary = generateBinary(dimension);
const gameOfLife = new GameOfLife(dimension, binary);
gameOfLife.print();
gameOfLife.tick();