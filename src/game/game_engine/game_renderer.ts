/**
 * Renderas all the sprites in the game
 */

import type { Game_engine_sprite } from "./sprite_draw";
import { Game_engine_animatable_sprite } from "./sprite_sheet";
let start = Date.now();

let _context: CanvasRenderingContext2D;
const _sprites = new Array<Game_engine_sprite>();

/// The main draw function must be called from the main game loop
function draw(delta: number) {
  _sprites.forEach(sprite => {
    sprite.draw(_context, delta);
  });
}

function add_sprite(sprite: Game_engine_sprite | Game_engine_animatable_sprite) {
  _sprites.push(sprite);
}

function initialize(context: CanvasRenderingContext2D) {
  _context = context;
}

setInterval(()=>{
  const now = Date.now();
  const delta = now - start;
  start = now;
  
  if (_context !== null && _context !== undefined) {
    draw(delta);
  }
  
},100);

export default {
  initialize,
  draw,
  add_sprite
}