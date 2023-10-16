export interface Game_engine_sprite_sheet {
  img:          CanvasImageSource;
  width:        number;
  height:       number;
  num_cols:     number;
  num_rows:     number;
  draw_frame:   any;
}

function create_game_engine_sprite_sheet(img: CanvasImageSource, width: number, height: number, num_cols: number, num_rows: number): Game_engine_sprite_sheet {
  const sprite: Game_engine_sprite_sheet = {
    img: img,
    width: width,
    height: height,
    cell_width: width / num_cols,
    cell_height: height / num_rows,
    num_cols: num_cols,
    num_rows: num_rows,
    destination_width: (width / num_cols),
    destination_height: (height / num_rows),
    draw_frame: function(context: CanvasRenderingContext2D, col: number, row: number) {

      const x = col * this.cell_width;
      const y = row * this.cell_height;
    
      console.log(x, y, this.cell_width, this.cell_height, this.destination_width, this.destination_height);

      context.drawImage(this.img, col * this.cell_width, row * this.cell_height, this.cell_width, this.cell_height, 0, 0, this.destination_width, this.destination_height);
    }
  };
  return sprite;
}

export interface Game_engine_animatable_sprite {
  sprite_sheet:     Game_engine_sprite_sheet;
  frame:            number;
  frame_delay:      number;
  frame_count:      number;
  x:                number;
  y:                number;
  scale:            number;
  rotation:         number;
  opacity:          number;
  visible:          boolean;
  animation_index:  number;
  set_animation:    any;
  set_frame:        any;
  play_animation:   any;
  draw:             any;
}

function create_game_engine_animatable_sprite(sprite: Game_engine_sprite_sheet) {
  const animatable_sprite: Game_engine_animatable_sprite = {
    sprite_sheet: sprite,
    frame: 0,
    frame_delay: 0,
    frame_count: 0,
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    opacity: 1,
    visible: true,
    animation_time: 0,
    playing: false,
    play_animation(start: boolean) {
      this.playing = start;
      if (start) {
        this.animation_time = 0;
        this.frame = 0;
      }
    },
    set_frame(col, row) {
      this.animation_index = col;
      this.frame = row;
    },
    set_animation(index): void {
      this.animation_time = 0;
      this.animation_index = index;
      this.frame = 0;
      this.frame_count = sprite.num_rows;
    },
    draw: function(context: CanvasRenderingContext2D, delta: number) {

      if (this.visible) {
        context.clearRect(this.x, this.y, this.sprite_sheet.destination_width, this.sprite_sheet.destination_height);
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation * Math.PI / 180);
        context.globalAlpha = this.opacity;

        if (this.playing) {
          this.animation_time += delta;
       
          if (this.animation_time > 300) {
            this.frame++;
            this.animation_time = 0;

            if (this.frame >= this.frame_count) {
              this.frame = 0;
            }
          }
        }

        const col = this.animation_index;
        const row = this.frame;

        this.sprite_sheet.draw_frame(context, col, row);
        context.restore();
      }
    }
  };
  return animatable_sprite;
}

export default {
  create_game_engine_sprite_sheet,
  create_game_engine_animatable_sprite
}