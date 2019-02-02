'use strict';

const TILE_SIZE = 20;
const PARETTE = ['#FFFFFF', '#B0C4DE'];

class Maze {
  constructor(width, height, field) {
    this.width = width;
    this.height = height;
    this.field = field;
  }
  color(x, y) {
    return this.field[y * this.width + x];
  }
  draw(canvas) {
    canvas.width = TILE_SIZE * this.width;
    canvas.height = TILE_SIZE * this.height;
    const ctx = canvas.getContext('2d');

    for (let j = 0; j < this.height; ++j) {
      for (let i = 0; i < this.width; ++i) {
        ctx.fillStyle = PARETTE[this.color(i, j)];
        ctx.fillRect(TILE_SIZE * i, TILE_SIZE * j, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}

const arr = [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1];
let maze = new Maze(4, 3, arr);
maze.draw(field);
