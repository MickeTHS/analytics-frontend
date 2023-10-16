
import { Game_engine_animatable_sprite, Game_engine_sprite_sheet } from "../game_engine/sprite_sheet";
import Sprite_sheet from '../game_engine/sprite_sheet';

export interface Player_character {

  setup() : void;
  play_animation(player_animation: number): void;

  sprite_sheet: Game_engine_sprite_sheet;
  sprite_instance: Game_engine_animatable_sprite | null;

  // wizard specific
  health: number;
  max_health: number;
  mana: number;
  max_mana: number;
  level: number;
  xp: number;
  current_animation: number;
  idle: boolean;
}

export const Player_animations = {
  IDLE: {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3
  },
  WALK: {
    LEFT: 4,
    RIGHT: 5,
    UP: 6,
    DOWN: 7
  }
}


function create_player(sprite_sheet: Game_engine_sprite_sheet): Player_character {

  const player: Player_character = {
    setup() {
      this.health = 100;
      this.max_health = 100;
      this.mana = 100;
      this.max_mana = 100;
      this.level = 1;
      this.xp = 0;

      this.sprite_instance = Sprite_sheet.create_game_engine_animatable_sprite(sprite_sheet);
      this.sprite_instance.set_animation(2);
      this.sprite_instance.play_animation(true);
    },
    play_animation(player_animation: number) {
      if (this.sprite_instance === null) return;
      
      if (player_animation < 4) {
        this.idle = true;
        this.sprite_instance.play_animation(false);

        switch (player_animation) {
          case Player_animations.IDLE.LEFT:
            this.sprite_instance.set_frame(2, 0);
            break;
          case Player_animations.IDLE.RIGHT:
            this.sprite_instance.set_frame(0, 0);
            break;
          case Player_animations.IDLE.UP:
            this.sprite_instance.set_frame(1, 0);
            break;
          case Player_animations.IDLE.DOWN:
            this.sprite_instance.set_frame(3, 0);
            break;
        }
        
      }
      else {
        this.idle = false; // walking

        switch (player_animation) {
          case Player_animations.WALK.LEFT:
            this.sprite_instance.set_frame(2, 0);
            break;
          case Player_animations.WALK.RIGHT:
            this.sprite_instance.set_frame(0, 0);
            break;
          case Player_animations.WALK.UP:
            this.sprite_instance.set_frame(1, 0);
            break;
          case Player_animations.WALK.DOWN:
            this.sprite_instance.set_frame(3, 0);
            break;
        }

        this.sprite_instance.play_animation(true);
      }
    },
    idle: false,
    current_animation: Player_animations.IDLE.DOWN,
    sprite_instance: null,
    sprite_sheet: sprite_sheet,
    health: 100,
    max_health: 100,
    mana: 100,
    max_mana: 100,
    level: 1,
    xp: 0
  };

  player.setup();

  return player;
}

export default {
  create_player
}
