

import kaboom from "kaboom"


addLevel([
    "                          $",
    "                          $",
    "           $$         =   $",
    "  %      ====         =   $",
    "                      =    ",
    "       ^^      = >        &",
    "===========================",
], {

    
    // define the size of each block
    width: 32,
    height: 32,
    // define what each symbol means, by a function returning a component list (what will be passed to add())
    "=": () => [
        sprite("floor"),
        area(),
        solid(),
    ],
    "$": () => [
        sprite("coin"),
        area(),
        pos(0, -9),
    ],
    "^": () => [
        sprite("spike"),
        area(),
        "danger",
    ],
})