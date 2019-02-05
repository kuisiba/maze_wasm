const load = wasm_bindgen('./maze_wasm_bg.wasm');
const gen = () =>
  load
    .then(() => wasm_bindgen.gen_maze(MAZE_WIDTH, MAZE_HEIGHT))
    .then(f => {
      let maze = new Maze(MAZE_WIDTH, MAZE_HEIGHT, f);
      maze.draw(field);
    });
gen();

const TILE_SIZE = 8;
const MAZE_WIDTH = 51;
const MAZE_HEIGHT = 51;
const PARETTE = ['#FFFFFF', '#B0C4DE'];

class Maze {
  constructor(width, height, field) {
    this.width = width;
    this.height = height;
    this.field = field;
  }
  color(x, y) {
    //console.log(y * this.width + x);
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

const button = document.querySelector('input');
button.addEventListener('click', gen);
