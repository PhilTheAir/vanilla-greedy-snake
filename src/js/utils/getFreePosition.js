export const getFreePosition = (columns, rows, exceptions) => {
	const x = Math.floor(Math.random() * 1000) % columns;
	const y = Math.floor(Math.random() * 1000) % rows;
	return isInExceptions(x, y, exceptions) ? getFreePosition(columns, rows, exceptions) : { x, y };
}

const isInExceptions = (x, y, exceptions) => {
  for (let i = 0, l = exceptions.length; i < l; i ++ ) {
    if ((x === exceptions[i].x) || (y === exceptions[i].y)) return true;
  }
  return false;
}