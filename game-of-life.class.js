export class GameOfLife {
  /*
  * Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
  * Any live cell with two or three live neighbours lives on to the next generation.
  * Any live cell with more than three live neighbours dies, as if by overpopulation.
  * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  */

  constructor(dimension, binary) {
    this.dimension = dimension;
    this.currentState = new Array(this.dimension).fill(0).map(() => new Array(this.dimension).fill(0));
    this.generateBasicState(binary);
  }

  iterateThrough(callback) {
    for (let x = 0; x < this.dimension; x++) {
      for (let y = 0; y < this.dimension; y++) {
        callback(x, y);
      }
    }
  }

  generateBasicState(binary) {
    let i = 0

    this.iterateThrough((x, y) => {
      if (i < binary.length) this.currentState[x][y] = +(binary[i++]);
    });
  }

  getNeighbours(x, y) {
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
          numberOfNeighbours += +this.currentState[x + i][y + j];
        }
      });
    });

    return numberOfNeighbours;
  }

  applyRules() {
    let nextState = new Array(this.dimension).fill(0).map(() => new Array(this.dimension).fill(0));

    this.iterateThrough((x, y) => {
      const neighbours = this.getNeighbours(x, y);
      if (this.currentState[x][y] == 1) {
        nextState[x][y] = (neighbours < 2 || neighbours > 3) ? 0 : 1;
      } else {
        nextState[x][y] = (neighbours == 3) ? 1 : 0;
      }
    });

    this.currentState = nextState;
  }

  tick() {
    setInterval(() => {
      this.applyRules();
      this.print();
    }, 100);
  }

  print() {
    let table = "";
    this.currentState.forEach(row => {
      table += row.join("").replace(/1/g, "\x1b[36m + ").replace(/0/g, "\x1b[31m . \x1b[0m");
      table += "\n";
    });
    console.log(table);
  }

}