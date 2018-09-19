import { Tiles, classNames } from "./";

export const renderer = {
  initialRender: (board, element) => {
    const boardInnerFragment = document.createDocumentFragment();
    const wall = document.createElement("div");
    wall.className = "wall";
    wall.style.setProperty('--rows', `${board.length - 2}`);
    wall.style.setProperty('--columns', `${board[0].length - 2}`);
    wall.appendChild(boardInnerFragment);
    element.appendChild(wall);

    const customData = board.map(line =>
      line.map(tileInfo => {
        const tile = document.createElement("div");
        tile.className = classNames[tileInfo.tileValue];
        (tileInfo.tileValue !== Tiles.Wall) && boardInnerFragment.appendChild(tile);
        return tile;
      }));
    return customData;
  },

  renderChanges: (customData, changes) => {
    changes.forEach(change => {
      const { x, y } = change.position;
      const box = customData[y][x];
      box.className = classNames[change.tileValue];
    });
  }
};
