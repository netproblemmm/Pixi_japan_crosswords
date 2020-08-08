import * as PIXI from "./pixi";

export class Preloader {
  constructor(app) {
    this.app = app;
    this.shown = false;
  }

  setPreload(flag) {
    if (flag !== this.shown) {
      this.shown = flag;
      if (flag) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  show() {
    this.shown = true;

    const tex = PIXI.Texture.from("./assets/japanFlag.png");
    const japanFlag = (this.japanFlag = new PIXI.Sprite(tex));
    const { app } = this;

    japanFlag.anchor.set(0.5);
    japanFlag.x = app.renderer.width / 2;
    japanFlag.y = app.renderer.height / 2;
    japanFlag.scale.set(2);

    app.stage.addChild(japanFlag);
  }

  hide() {
    this.shown = false;
    this.app.stage.removeChild(this.japanFlag);
  }
}
