let F = wasm_bindgen('./maze_wasm_bg.wasm').then(() =>
  wasm_bindgen.gen_maze(51, 51),
);
F.then(val => console.log(val));

const TILE_SIZE = 5;
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

let maze = new Maze(51, 51, F);
maze.draw(field);
