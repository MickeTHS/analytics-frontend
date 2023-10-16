
export interface Game_engine_sprite {
  img:    CanvasImageSource;
  x:      number;
  y:      number;
  width:  number;
  height: number;
  scale:  number;
  rotation: number;
  opacity: number;
  visible: boolean;
  draw: (context: CanvasRenderingContext2D) => void;
}

// instantiate a GameEngineSprite

function create_game_engine_sprite(img: CanvasImageSource, x: number, y: number, width: number, height: number, scale: number, rotation: number, opacity: number, visible: boolean): Game_engine_sprite {
  const sprite: Game_engine_sprite = {
    img: img,
    x: x,
    y: y,
    width: width,
    height: height,
    scale: scale,
    rotation: rotation,
    opacity: opacity,
    visible: visible,
    draw: function(context: CanvasRenderingContext2D) {
      if (this.visible) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation * Math.PI / 180);
        context.globalAlpha = this.opacity;
        context.drawImage(this.img, 0, 0, this.width, this.height);
        context.restore();
      }
    }
  };
  return sprite;
}


export default {
  create_game_engine_sprite
}