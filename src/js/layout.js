import { KeyDirectionMap, renderer } from './utils';
import { Snake } from './snake';

class Layout {
  constructor(element, renderer) {
    this._element = element;
    this._renderer = renderer;
    this._gameSpeed = 200;
    this._gameSpeedUpdate = 5;
    this._gameSpeedMin = 32;
    this._frame = 0;
    this.rate = 12;
    this._running = false;
    this._paused = false;
    this._lastPressedDirection = null;
    this._rendererCustomData = null;
    this._boundTimeout = this.timeout.bind(this);

    const rows = 30;
    const columns = 30;
    this._snake = new Snake(rows, columns);

    this.bindArrow();
    this.init();
    this.startRunning();
  }

  init() {
    const defaultBoard = this._snake.getBoard().map((row, yIndex) =>
      row.map((tileValue, xIndex) => ({
        position: {
          x: xIndex,
          y: yIndex
        },
        tileValue
      })));

    this._rendererCustomData = this._renderer.initialRender(
      defaultBoard,
      this._element
    );
  }

  tick() {
    if (this._lastPressedDirection) {
      this._snake.setDirection(this._lastPressedDirection);
      this._lastPressedDirection = null;
    }
    const tickReturn = this._snake.tick();
    if (!tickReturn.gameOver) {
      if (tickReturn.justAteFruit) {
        this._gameSpeed = Math.max(this._gameSpeed - this._gameSpeedUpdate, this._gameSpeedMin);
      }
      this._renderer.renderChanges(this._rendererCustomData, changes);
    }
    else {
      this._element.classList.add('gameover');
      this._running = false;
    }
  }

  bindArrow() {
    document.body.addEventListener('keyup', e => {
      if (e.key === ' ') {
        if (!this._running) {
          this.startRunning();
        }
        else {
          this._paused = !this._paused;
          this._element.classList.toggle('paused', this._paused);
        }
      }
      else if (KeyDirectionMap[e.key]) {
        this._lastPressedDirection = KeyDirectionMap[e.key];
      }
    });
  }

  timeout() {
    if (this._frame * this.rate < this._gameSpeed) {
      this._frame += 1;
      window.requestAnimationFrame(this._boundTimeout);
      return;
    }
    this._frame = 0;

    if (!this._paused) {
      this.tick();
    }

    if (this._running) {
      window.requestAnimationFrame(this._boundTimeout);
    }
  }

  startRunning() {
    window.requestAnimationFrame(this._boundTimeout);
    this._running = true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Layout(document.getElementById('snake-game'), renderer);
});
