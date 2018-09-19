export const Tiles = {
  Empty: 0,
  Wall: 1,
  Snake: 2,
  Fruit: 3
};

export const classNames = ["empty", "wall", "snake", "fruit"];

export const Direction = {
  Up: 1,
  Left: 2,
  Down: 3,
  Right: 4
};

const { Up, Left, Down, Right } = Direction;

export const KeyDirectionMap = {
  'w': Up,
  'W': Up,
  'ArrowUp': Up,
  's': Down,
  'S': Down,
  'ArrowDown': Down,
  'a': Left,
  'A': Left,
  'ArrowLeft': Left,
  'd': Right,
  'D': Right,
  'ArrowRight': Right,
};
