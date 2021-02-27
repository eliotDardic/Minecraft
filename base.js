const matrix_size = 30;
const matrix = [];
const SKY = 1;
const CLOUD = 2;
const GROUND = 3;
const ROCK = 4;
const TIMBER = 5;
const LEAFS = 6;

// game tools
const TOOL_NOT_SELECTED = 10;
const TOOL_SHOVEL = 11;
const TOOL_AXE = 12;
const TOOL_PIKEAXE = 13;

const tools = {
  shovel: {
    id: TOOL_SHOVEL,
    name: 'Shovel',
    canRemove: GROUND,
    image: ''
  },
  axe: {
    id: TOOL_AXE,
    name: 'Axe',
    canRemove: TIMBER,
    image: ''
  },
  pikeaxe: {
    id: TOOL_PIKEAXE,
    name: 'Pikeaxe',
    canRemove: ROCK,
    image: ''
  }
}

// game status
const game = {
  score: 0,
  tool: TOOL_NOT_SELECTED,
  inventory:{
    rock: 0,
    gound: 0,
    timber:0
  }
}


for(let y = 0; y < matrix_size; y++){// sky is 19 rows
  matrix.push([])
  for(let x = 0; x < matrix_size; x++){
    matrix[y].push(SKY);
  }
}

for(let y = 19; y < matrix_size; y++){// Ground is last 10 rows
  for(let x = 0; x < matrix_size; x++){
    matrix[y][x] = GROUND;
  }
}

for(let y = 18, inc_x = 0; y > 7; y--, inc_x++){// ROCK is between 19 to 7
  for(let x = 23; x < matrix_size; x++){// x starts 1 cell to the right each row
    matrix[y][x + inc_x] = ROCK;
  }
}

for(let y = 18; y > 11; y--){ // tree's timber
  matrix[y][13] = TIMBER;
}

for(let y = 11; y > 7; y--){ // tree's leafs
  for(let x=12; x < 16; x++){
    matrix[y][x] = LEAFS;
  }
}

for(let y = 7; y > 4; y--){ // Cloud
  for(let x=4; x < 11; x++){
    matrix[y][x] = CLOUD;
  }
}

// functions to handle the game

const gameClickHandler = (target) => {
  let wasRemoved = false;
  switch(game.tool){
    case TOOL_SHOVEL:
      if(target.getAttribute('data-tile-type') === GROUND){
        game.inventory.gound++;
        wasRemoved = true;
      }
      break;
    case TOOL_AXE:
      if(target.getAttribute('data-tile-type') === TIMBER){
        game.inventory.timber++;
        wasRemoved = true;
      }
      break;
    case TOOL_PIKEAXE:
      if(target.getAttribute('data-tile-type') === ROCK){
        game.inventory.rock++;
        wasRemoved = true;
      }
      break;
  }
  if(wasRemoved){
    // change background image to sky in target element
  }
}

const toolSelectHandler = (target) => {
  game.tool = target.getAttribute('data-tool');
}

// for debug
let out = '';
for(let y = 0; y < matrix_size; y++){
  for(let x = 0; x < matrix_size; x++){
    out += matrix[y][x];
  }
  out += '\n';
}
console.log(out);

// build world html
const worldEl = document.getElementById ('world');
for(let y = 0; y < matrix_size; y++){
  for(let x = 0; x < matrix_size; x++){
    const tile = document.createElement('div');
    tile.setAttribute('data-tile', matrix[y][x]);
    switch(matrix[y][x]){
      case  SKY:
        tile.innerText = 'sky';
        break;
      case  CLOUD:
        tile.innerText = 'cld';
        break;
      case  TIMBER:
        tile.innerText = 'tmb';
        break;
      case  LEAFS:
        tile.innerText = 'fls';
        break;
      case  GROUND:
        tile.innerText = 'grd';
        break;
      case  ROCK:
        tile.innerText = 'rck';
        break;
    }
    worldEl.appendChild(tile);
  }
  out += '\n';
}
