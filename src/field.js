import * as PIXI from "./pixi";

export class Field {
  constructor(app) {
    this.app = app;
    this.pictureCellsQtyX = 0;
    this.pictureCellsQtyY = 0;
    // ширина и высота всего поля (картинка + цифры)
    this.width = 0;
    this.height = 0;
    // координвты игрового поля
    this.x = 0;
    this.y = 0;

    this.upDigits = [];
    this.leftDigits = [];
    this.answer = [];
    this.cells = [];
    this.cellsComp = [];
  }

  initLevel(levelNumber) {
    const { app } = this;
    const { game } = app;
    this.createField(levelNumber);
    game.world.interactive = true;
    game.world.on("pointerdown", this.toggleCell.bind(this));
  }

  createField(levelNumber) {
    const { app } = this;
    const { game } = app;
    const { world } = game;
    let field = new PIXI.Graphics();

    this.upDigits = game.levels[levelNumber].upDigits;
    this.leftDigits = game.levels[levelNumber].leftDigits;
    this.pictureCellsQtyX = game.levels[levelNumber].pictureCellsQtyX;
    this.pictureCellsQtyY = game.levels[levelNumber].pictureCellsQtyY;
    this.digitsCellsQtyX = game.levels[levelNumber].digitsCellsQtyX;
    this.digitsCellsQtyY = game.levels[levelNumber].digitsCellsQtyY;
    // считаем ширину и высоту всего поля (картинка + цифры) в пикселях
    this.width = (this.pictureCellsQtyX + this.digitsCellsQtyX) * 50;
    this.height = (this.pictureCellsQtyY + this.digitsCellsQtyY) * 50;
    this.x = app.renderer.width / 2 - this.width / 2;
    this.y = app.renderer.height / 2 - this.height / 2;

    this.answer = game.levels[levelNumber].answer;
    // заполнение массива ячеек игрового поля

    this.cells.length = 0;
    for (let y = 0; y < this.pictureCellsQtyY; y++) {
      this.cells[y] = [];
      for (let x = 0; x < this.pictureCellsQtyX; x++) {
        this.cells[y][x] = "0";
      }
    }

    this.cellsComp.length = 0;
    for (let y = 0; y < this.pictureCellsQtyY; y++) {
      this.cellsComp[y] = [];
      for (let x = 0; x < this.pictureCellsQtyX; x++) {
        this.cellsComp[y][x] = null;
      }
    }

    // рисование игрового поля
    field.lineStyle(1, "black");
    for (let y = this.y; y < this.y + this.height; y += 50) {
      for (let x = this.x; x < this.x + this.width; x += 50) {
        field.beginFill(0xdac58e);
        field.drawRect(x, y, 50, 50);
      }
    }

    field.beginFill(0x505050);
    field.drawRect(
      this.x,
      this.y,
      this.digitsCellsQtyX * 50,
      this.digitsCellsQtyY * 50
    );
    field.endFill();

    for (let y = 0; y < this.upDigits.length; y++) {
      for (let x = 0; x < this.upDigits[0].length; x++) {
        let text = new PIXI.Text(this.upDigits[y][x]);
        text.x = this.x + this.digitsCellsQtyX * 50 + x * 50 + 15;
        text.y = this.y + y * 50 + 10;
        world.addChild(text);
      }
    }
    for (let y = 0; y < this.leftDigits.length; y++) {
      for (let x = 0; x < this.leftDigits[0].length; x++) {
        let text = new PIXI.Text(this.leftDigits[y][x]);
        text.x = this.x + x * 50 + 15;
        text.y = this.y + this.digitsCellsQtyY * 50 + y * 50 + 15;
        world.addChild(text);
      }
    }

    world.addChildAt(field, 0);
    return field;
  }

  // обработка кликов
  toggleCell(event) {
    const { app } = this;
    const stage = app.game.world;
    let cell = new PIXI.Graphics();

    let x = event.data.global.x;
    let y = event.data.global.y;

    if (this.isClickInField(x, y)) {
      let nearestCellY = parseInt(
        (y - this.y - this.digitsCellsQtyY * 50) / 50,
        10
      );
      let nearestCellX = parseInt(
        (x - this.x - this.digitsCellsQtyX * 50) / 50,
        10
      );
      let cellStyle = "";

      switch (this.cells[nearestCellY][nearestCellX]) {
        case "0":
          this.cells[nearestCellY][nearestCellX] = "1";
          cellStyle = "0x000000"; // черный
          break;
        case "1":
          this.cells[nearestCellY][nearestCellX] = "X";
          cellStyle = "X"; // пустой + Х
          break;
        case "X":
          this.cells[nearestCellY][nearestCellX] = "0";
          cellStyle = "0xdac58e"; // пустой
          break;
        default:
          console.log("color not finded");
      }

      let oldComp = this.cellsComp[nearestCellY][nearestCellX];
      if (oldComp) {
        oldComp.destroy();
      }

      if (cellStyle === "X") {
        /*cell.beginFill(0xdac58e);
        cell.drawRect(
          this.x + this.digitsCellsQtyX * 50 + nearestCellX * 50 + 1,
          this.y + this.digitsCellsQtyY * 50 + nearestCellY * 50 + 1,
          48,
          48
        );
        cell.endFill();
        stage.addChild(cell);*/

        let text = new PIXI.Text("X");
        text.x = this.x + this.digitsCellsQtyX * 50 + nearestCellX * 50 + 15;
        text.y = this.y + this.digitsCellsQtyY * 50 + nearestCellY * 50 + 10;
        stage.addChild(text);
        this.cellsComp[nearestCellY][nearestCellX] = text;
      } else {
        cell.beginFill(cellStyle);
        cell.drawRect(
          this.x + this.digitsCellsQtyX * 50 + nearestCellX * 50 + 1,
          this.y + this.digitsCellsQtyY * 50 + nearestCellY * 50 + 1,
          48,
          48
        );
        cell.endFill();
        stage.addChild(cell);
        this.cellsComp[nearestCellY][nearestCellX] = cell;
      }
    }

    // проверка - решен ли кроссворд
    if (this.isPuzzleDone()) {
      const { game } = app;
      const style = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 46,
        fontWeight: "bold",
        fill: ["#ffffff", "0x3500FA", "0xDE3249"], // gradient
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: "#000000",
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6
      });
      let text = new PIXI.Text("ПОБЕДА!", style);
      text.x = this.x + this.width / 2 - text.width / 2; // 190
      text.y = this.y + this.height / 2 - text.height / 2; // 195
      app.game.world.addChild(text);
      game.world.interactive = false;
    }
  }

  // проверка - сделан ли клик в границах поля
  isClickInField(x, y) {
    if (
      x > this.x + this.digitsCellsQtyX * 50 &&
      x < this.x + this.width &&
      y > this.y + this.digitsCellsQtyY * 50 &&
      y < this.y + this.height
    ) {
      return true;
    } else {
      return false;
    }
  }

  // проверка условия окончания игры - собрана ли картинка
  // TODO дописать определение только закрашенных (1) ячеек
  isPuzzleDone() {
    return JSON.stringify(this.cells) === JSON.stringify(this.answer);
  }
}
