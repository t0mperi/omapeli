

import kaboom from "kaboom"



const block_size = 20

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


const map = addlevel([
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
],{


      width:block_size,
      height: block_size,
      pos: vec2(0,0),
      'x': () => [rect(block_size), color(255, 255, 255), area(), 'wall'],
})