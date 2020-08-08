import * as PIXI from "./pixi";
import { Level } from "./level";

const lvl1 = new Level();
lvl1.load(1);
const lvl2 = new Level();
lvl2.load(2);

const style = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fontStyle: "italic",
  fontWeight: "bold",
  fill: ["#ffffff", "#00ff99"], // gradient
  stroke: "#4a1850",
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440
});

export class Game {
  constructor(app) {
    this.app = app;
    this.levels = [lvl1, lvl2];
  }

  initLevel() {
    if (this.world) {
      this.world.destroy({ children: true });
    }
    this.world = new PIXI.Container();
    this.gameLoop = new PIXI.Ticker();
    this.app.stage.addChildAt(this.world, 0);
  }

  onStartup() {
    const { app, levels } = this;

    app.preloader.show();

    app.ticker.add(() => {
      if (this.gameLoop) {
        this.gameLoop.update();
      }
    });

    const options = { crossOrigin: "*" };
    app.loader.baseUrl = "../assets";
    app.loader.add("pergament", "pergament.png", options);

    app.loader.load(() => {
      setTimeout(() => {
        app.preloader.hide();

        this.level = lvl1;
        app.runners.initLevel.run(0);

        for (let i = 0; i < levels.length; i++) {
          const lvl = levels[i];
          const btn = new PIXI.Text(`Level ${i + 1}`, style);
          btn.x = ((i + 1) * app.screen.width) / (levels.length + 1);
          btn.y = 580;
          btn.anchor.set(0.5);
          app.stage.addChild(btn);

          btn.interactive = true;
          btn.click = () => {
            console.log("btnClick");
            if (lvl !== this.level) {
              this.level = lvl;
              app.runners.initLevel.run(i);
            }
          };
        }
      }, 3);
    });
  }
}
