import * as PIXI from "./pixi";

export class Background {
  constructor(app) {
    this.app = app;
  }

  initLevel() {
    const { app } = this;
    this.bg1 = this.createBg(app.loader.resources["pergament"].texture);
    this.bg1.tilePosition.y = 0;
    this.bg1.scale.set(0.5);
  }

  createBg(tex) {
    let tiling = new PIXI.TilingSprite(tex, 1100, 1257);
    tiling.position.set(30, 50);
    this.app.world.addChildAt(tiling, 0);
    return tiling;
  }
}
