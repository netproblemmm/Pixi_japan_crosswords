export class Level {
  constructor(levelNumber) {
    // номер уровня
    this.levelNumber = levelNumber;
    // к-во ячеек в картинке по X и Y
    this.pictureCellsQtyX = 0;
    this.pictureCellsQtyY = 0;
    // толщина блока цифр по X и Y
    this.digitsCellsQtyX = 0;
    this.digitsCellsQtyY = 0;
    // массив верхних чисел
    this.upDigits = [];
    // массив левыз чисел
    this.leftDigits = [];
  }

  // настройки каждого уровня
  load(levelNumber) {
    switch (levelNumber) {
      case 1:
        this.pictureCellsQtyX = 6;
        this.pictureCellsQtyY = 5;
        this.digitsCellsQtyX = 3;
        this.digitsCellsQtyY = 2;
        // массив верхних цифр
        this.upDigits = [
          ["", "", "", "", "1", ""],
          ["2", "1", "1", "3", "1", "3"]
        ];
        // массив левых цифр
        this.leftDigits = [
          ["", "", "1"],
          ["", "1", "1"],
          ["", "4", "1"],
          ["1", "1", "1"],
          ["", "", "1"]
        ];
        // массив ответа на пазл
        // this.answer = [
        //   ["X", "X", "X", "X", "1", "X"],
        //   ["X", "X", "X", "1", "X", "1"],
        //   ["1", "1", "1", "1", "X", "1"],
        //   ["1", "X", "X", "1", "X", "1"],
        //   ["X", "X", "X", "X", "1", "X"]
        // ];
        // шаблон ответа для быстрого тестирования
        this.answer = [
          ["0", "0", "0", "0", "0", "1"],
          ["0", "0", "0", "0", "0", "0"],
          ["0", "0", "0", "0", "0", "0"],
          ["0", "0", "0", "0", "0", "0"],
          ["0", "0", "0", "0", "0", "0"]
        ];
        break;
      case 2:
        this.pictureCellsQtyX = 5;
        this.pictureCellsQtyY = 6;
        this.digitsCellsQtyX = 1;
        this.digitsCellsQtyY = 1;
        // массив верхних цифр
        this.upDigits = [["1", "6", "6", "6", "1"]];
        // массив левых цифр
        this.leftDigits = [["3"], ["3"], ["3"], ["3"], ["3"], ["6"]];
        // массив ответа на пазл
        // this.answer = [
        //   ["X", "1", "1", "1", "1", "X"],
        //   ["X", "1", "1", "1", "1", "X"],
        //   ["X", "1", "1", "1", "1", "X"],
        //   ["X", "1", "1", "1", "1", "X"],
        //   ["1", "1", "1", "1", "1", "1"]
        // ];
        // шаблон ответа для быстрого тестирования
        this.answer = [
          ["0", "0", "0", "0", "0"],
          ["0", "0", "0", "0", "1"],
          ["0", "0", "0", "0", "0"],
          ["0", "0", "0", "0", "0"],
          ["0", "0", "0", "0", "0"],
          ["0", "0", "0", "0", "0"]
        ];
        break;
      default:
        console.log("default");
    }
  }
}
