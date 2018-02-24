import { Cell } from './cell.class';


export class Grid {

  constructor(dimension) {
    this.dimension = dimension;
    this.grid = new Array(this.dimension).fill().map(() => new Array(this.dimension).fill().map(() => new Cell(0)));
  }

  getCell(x, y) {
    return this.grid[x][y];
  }

  iterateThrough(callback) {
    this.grid.forEach((row, x) => {
      row.forEach((cell, y) => {
        callback(x, y, cell);
      });
    });
  }

  setDefault(binary) {
    let i = 0

    this.iterateThrough((x, y, cell) => {
      if (i < binary.length) cell.value = +(binary[i++]);
    });
  }

  getACellNeighbours(x, y) {
    let numberOfNeighbours = 0;
    const offset = [-1, 0, 1];

    offset.forEach(i => {
      offset.forEach(j => {
        const rules = [
          x + i >= 0,
          x + i < this.dimension,
          y + j >= 0,
          y + j < this.dimension,
          i !== 0 || j !== 0,
        ];

        if (rules.every(rule => rule === true)) {
          numberOfNeighbours += +this.getCell(x + i, y + j).value;
        }
      });
    });

    return numberOfNeighbours;
  }
}