import { Grid } from './grid.class';


export class GameOfLife {
  /*
  * Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
  * Any live cell with two or three live neighbours lives on to the next generation.
  * Any live cell with more than three live neighbours dies, as if by overpopulation.
  * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  */

  constructor(dimension, binary) {
    this.dimension = dimension;
    this.grid = new Grid(this.dimension);
    this.grid.setDefault(binary);
  }

  applyRules() {
    let nextState = new Grid(this.dimension);

    this.grid.iterateThrough((x, y, cell) => {
      const neighbours = this.grid.getACellNeighbours(x, y);

      if (cell.value == 1) {
        nextState.getCell(x, y).value = !(neighbours < 2 || neighbours > 3);
      } else {
        nextState.getCell(x, y).value = (neighbours == 3);
      }
    });

    this.grid = nextState;
  }

  tick() {
    setInterval(() => {
      this.applyRules();
      this.print();
    }, 100);
  }

  print() {
    let table = "";
    this.grid.grid.forEach(row => {
      table += row.map(cell => cell.repr()).join("");
      table += "\n";
    });
    console.log(table);
  }

}