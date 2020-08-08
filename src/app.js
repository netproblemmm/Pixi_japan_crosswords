import * as PIXI from "./pixi";
import { Preloader } from "./preloader";
import { Game } from "./game";
import { Field } from "./field";
import { Background } from "./background";

export class App {
  constructor() {
    this.renderer = new PIXI.Renderer({
      width: 600,
      height: 720
    });
    this.ticker = new PIXI.Ticker();
    this.stage = new PIXI.Container();
    this.loader = new PIXI.Loader();

    this.ticker.add(this.render.bind(this), PIXI.UPDATE_PRIORITY.LOW);
    this.ticker.start();

    this.runners = {
      onStartup: new PIXI.Runner("onStartup"),
      initLevel: new PIXI.Runner("initLevel")
    };

    this.addSystem("preloader", new Preloader(this));
    this.addSystem("game", new Game(this));
    this.addSystem("field", new Field(this));
    this.addSystem("background", new Background(this));
  }

  addSystem(name, inst) {
    this[name] = inst;
    for (let key in this.runners) {
      const runner = this.runners[key];
      runner.add(inst);
    }
  }

  render() {
    this.renderer.render(this.stage);
  }

  get view() {
    return this.renderer.view;
  }

  get screen() {
    return this.renderer.screen;
  }

  get gameLoop() {
    return this.game.gameLoop;
  }

  get world() {
    return this.game.world;
  }

  destroy() {
    this.renderer.destroy();
    this.ticker.stop();
  }
}
