

import kaboom from "kaboom"

kaboom({
  background: [0, 0, 0],
  fullscreen: true,
  clearColor: [0, 0, 0, 1]
});

const MAX_SPEED = 0.1
const SPEED_INCREMENT = 0.02
const block_size = 30

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


//level
const map = addLevel([
  
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "x                                      x",
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
], 
{
      width: block_size,
      height: block_size,
      pos: vec2(0, 0),
      'x': () => [rect(block_size, block_size), color(0, 255, 255), area(), 'wall']

})

//Snaken syntyminen
function respawn_snake(){
    destroyAll('snake')
    snake_body = []
    snake_length = 2
    
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

// Pelin resetointi
function respawn_all(){
  run_action = false
  wait(0.5, function() {
    respawn_snake()
    respawn_food()
    run_action = true
   })
}

respawn_all()


//Tekstit pelin loppumisessa, R näppäimellä uudestaan aloittaminen
function reset_game() {
  respawn_all();
  destroyAll("game-over-text");
  destroyAll("restart-text");
}

function game_over() {
  destroyAll();
  add([
    text("Try again!", 3),
    pos(width() / 2, height() / 2),
    origin("center"),
    "game-over-text",
  ]);

  add([
    text("Press R to restart", 3),
    pos(width() / 2, height() / 2 + 40),
    origin("center"),
    "restart-text",
  ]);

  keyPress("r", () => {
    reset_game();
  });
}

//Liikkuminen, kun näppäintä painetaan tarkistetaan ensin onko käärme jo menossa vastakkaiseen suuntaan
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

//liikkumisnopeus
let move_delay = 0.7;
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
        move_x = 0;
        move_y = block_size;
        break;
    case directions.UP:
        move_x = 0;
        move_y = -block_size;
        break;
    case directions.LEFT:
        move_x = -block_size;
        move_y = 0;
        break;
    case directions.RIGHT:
        move_x = block_size;
        move_y = 0;
        break;
}
  //Käärmeen sijainti

   let snake_head = snake_body[snake_body.length - 1]
  
  let new_pos = vec2(snake_head.pos.x + move_x, snake_head.pos.y + move_y)

  if (new_pos.x < 0 || new_pos.x >= width() || new_pos.y < 0 || new_pos.y >= height()) {
    run_action = false
    game_over()
    
  } else {
    snake_body.push(add([
      rect(block_size, block_size),
      pos(new_pos),
      color(255, 0, 0),
      area(),
      'snake',
      
    ]))
//Poistetaan hännästä ainakun mato liikkuu eteenpäin
    if (snake_body.length > snake_length) {
      let tail = snake_body.shift()
      destroy(tail)
    }
  } 

})



// random ruoka spawn
let food = null
function respawn_food(){
  let new_pos = rand(vec2(1, 1), vec2(15, 15))
  new_pos.x = Math.floor(new_pos.x)
  new_pos.y = Math.floor(new_pos.y)
  new_pos = new_pos.scale(block_size)

  if (food) {
    destroy(food)
    
  }
  food = add([
  rect(block_size, block_size),
    color(255, 255, 0),
    pos(new_pos),
    area(),
    'food',
  ])
}
 
//snake syö ruokaa se kasvaa +1 ja nopeus kasvaa ruokaa syödessä.
  collides('snake', 'food', (s, f) => {
  snake_length++
  respawn_food()
    
   if (move_delay > MAX_SPEED) {
    move_delay -= SPEED_INCREMENT
  }
})


//snake osuu seinään peli päättyy
collides('snake', 'wall', () => {
  run_action = false
  game_over()
  

})

//snake osuu itseensä peli päättyy
collides('snake', 'snake', () => {
  run_action = false
  game_over()

})

//pause
keyPress('space', () => {
  run_action = false;
});

keyRelease('space', () => {
  run_action = true;
});
