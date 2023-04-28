

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


let current_direction = directions.DOWN
let run_action = false
let snake_length = 4
let snake_body = []

//levels
const map = addLevel([
  
      "xxxxxxxxxxxxxxxxxxxxxxxxxx",
      "x                        x",
      "x                        x",
      "x                        x",
      "x                        x",
      "x                        x",
      "x             x          x",
      "x             x          x",
      "x             x          x",
      "x             x          x",
      "x             x          x",
      "x                        x",
      "x                        x",
      "x                        x",
      "x                        x",
      "x                        x",
      "x                        x",
      "x                        x",
      "x                        x",
      "xxxxxxxxxxxxxxxxxxxxxxxxxx",
], 
{
      width: block_size,
      height: block_size,
      pos: vec2(0, 0),
      'x': () => [rect(block_size, block_size), color(255, 255, 255), area(), 'wall']

})

function respawn_snake(){
    destroyAll('snake')
    snake_body = []
    snake_length = 1
    
    for( let i = 1; i <= snake_length; i++)
    {
        let segment = add([
          rect(block_size, block_size),
          pos(block_size, block_size * i),
          color(255, 0, 0),
          area(),
          'snake',
        ])
      snake_body.push(segment)
        
    }
  current_direction = directions.RIGHT
}

function respawn_all(){
  run_action = false
  wait(0.5, function() {
    respawn_snake()
    run_action = true
   })
}

respawn_all()








//Snake move
keyPress('up', () => {
    if (current_direction != directions.DOWN) {
        current_direction = directions.UP
    }
})
keyPress('down', () => {
    if (current_direction != directions.UP) {
        current_direction = directions.DOWN
    }
})
keyPress('left', () => {
    if (current_direction != directions.RIGHT) {
        current_direction = directions.LEFT
    }
})
keyPress('right', () => {
    if (current_direction != directions.LEFT) {
        current_direction = directions.RIGHT
    }
})



let move_delay = 0.2
let timer = 0

action(()=>{

  if(!run_action) return

  timer += dt()
  if(timer < move_delay) return
  timer = 0

  let move_x = 0
  let move_y = 0

  switch(current_direction){
      
    case directions.DOWN:
      move_x = 0
      move_y = -1 * block_size
      break
      
    case directions.UP:
      move_x = 0
      move_y = -1 * block_size
      break     
      
    case directions.LEFT:
      move_x = 0
      move_y = -1 * block_size
      break         
              
    case directions.RIGHT:
      move_x = 0
      move_y = -1 * block_size
      break
  }

  
  let snake_head = snake_body[snake_body.length -1]

    snake_body.push(
    add([
    rect(block_size, block_size),
    pos(snake_head.pos.x + move_x, snake_head.pos.y + move_y),
    color(255, 0, 0),
    area(),
    'snake',
                  
])
)

  if(snake_body.length > snake_length) {
  let tail = snake_body.shift()
  destroy(tail)
}


})