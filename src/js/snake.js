import { Tiles, Direction, getFreePosition } from "./utils";

export class Snake {
  constructor(rows, columns) {
    const { Wall, Empty, Fruit } = Tiles;
    const { Right } = Direction;
    this._rows = rows;
    this._columns = columns;
    this._board = Array(columns).fill(null).map(() => Array(rows).fill(Empty));
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        // this._board[y] = this._board[y] || [];
        if (x === 0 || x === columns - 1 || y === 0 || y === rows - 1) {
          this._board[y][x] = Wall;
        }
      }
    }
    this._snake = [
      {
        x: Math.floor(columns / 2),
        y: Math.floor(rows / 2)
      }
    ];
    this._direction = Right;
    this._fruitPosition = getFreePosition(this._columns, this._rows, this._snake);
    this._board[this._fruitPosition.y][this._fruitPosition.x] = Fruit;
  }

  getBoard() {
    const copy = [...this._board];
    this._snake.forEach(s => {
      copy[s.y][s.x] = Tiles.Snake;
    });
    return copy;
  }

  setDirection(direction) {
    if (Direction[direction] && (this._direction !== direction) && 
      (Math.abs(this._direction - direction) !== 2)) this._direction = direction;
  }

  isGameOver() {
    if ((this._snake[0].x === 0) || (this._snake[0].x === this._columns - 1) ||
      (this._snake[0].y === 0) || (this._snake[0].y === this._rows - 1)) return true;

    if (this._snake.length > 4) {
      for (let i = 3; i < this._snake.length; i++) {
        if ((this._snake[0].x === this._snake[i].x) && (this._snake[0].y === this._snake[i].y)) return true;
      }
    }
    return false;
  }

  tick() {
    const { Up, Left, Down, Right } = Direction;
    const { Empty, Fruit, Snake } = Tiles;
    if (this._direction === Up) {
      this._snake[0].y -= 1;
    }
    else if (this._direction === Down) {
      this._snake[0].y += 1;
    }
    else if (this._direction === Left) {
      this._snake[0].x -= 1;
    }
    else if (this._direction === Right) {
      this._snake[0].x += 1;
    }

    const changes = [
      {
        position: this._snake[0],
        tileValue: Snake
      }
    ];
    const rear = { ...this._snake.slice(-1)[0] };
    const head = { ...this._snake[0] };
    const justAteFruit = (this._snake[0].x === this._fruitPosition.x) && (this._snake[0].y === this._fruitPosition.y);
    if (justAteFruit) {
      this._snake = [this._fruitPosition, head, ...this._snake.slice(1)];
      const newFruitPosition = getFreePosition(this._columns, this._rows, this._snake);
      this._board[newFruitPosition.y][newFruitPosition.x] = Fruit;
      changes.push({
        position: newFruitPosition,
        tileValue: Fruit
      });
      this._fruitPosition = newFruitPosition;
    } 
    else if (this._snake.length > 1) {
      for (let i = this._snake.length - 1; i > 1; i--) {
        this._snake[i] = this._snake[i - 1];
      }
      this._snake[1] = head;
    }
    else if ((rear.x !== this._snake[0].x) || (rear.y !== this._snake[0].y)) {
      changes.push({
        position: rear,
        tileValue: Empty
      });
    }
    return {
      gameOver: this.isGameOver(),
      justAteFruit,
      changes
    };
  }
}
