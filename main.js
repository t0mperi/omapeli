

import kaboom from "kaboom"

kaboom();

const block_size = 5

const directions = 
{
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
}


let current_direction = directions.RIGHT
let run_action = false
let snake_length = 4
let snake_body = []

//levels
const map = addLevel([
  
      "xxxxxxxxxxxxxxxxxxxx",
      "x                  x",
      "x             x    x",
      "x             x    x",
      "x             x    x",
      "x                  x",
      "x                  x",
      "x                  x",
      "x                  x",
      "x                  x",
      "x                  x",
      "x                  x",
      "x       x          x",
      "x       x          x",
      "x       x          x",
      "x                  x",
      "x                  x",
      "x                  x",
      "x                  x",
      "xxxxxxxxxxxxxxxxxxxx",
], 
{
      width: block_size,
      height: block_size,
      pos: vec2(0, 0),
      'x': () => [rect(block_size, block_size), color(255, 0, 0), area(), 'wall'],
})

//Snake move
keyDown('up', () => {
    if (current_direction !== directions.DOWN) {
        current_direction = directions.UP
    }
})
keyDown('down', () => {
    if (current_direction !== directions.UP) {
        current_direction = directions.DOWN
    }
})
keyDown('left', () => {
    if (current_direction !== directions.RIGHT) {
        current_direction = directions.LEFT
    }
})
keyDown('right', () => {
    if (current_direction !== directions.LEFT) {
        current_direction = directions.RIGHT
    }
})