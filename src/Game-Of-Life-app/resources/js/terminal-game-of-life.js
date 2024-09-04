const ROWS = 20;
const COLS = 40;

let grid = createEmptyGrid(ROWS, COLS);
fillGridRandomly(grid);

setInterval(() => {
  console.clear();
  displayGrid(grid);
  grid = computeNextGeneration(grid);
}, 300);

function createEmptyGrid(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function fillGridRandomly(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      grid[row][col] = Math.random() < 0.3 ? 1 : 0;
    }
  }
}

function displayGrid(grid) {
  const output = grid.map(row => row.map(cell => (cell ? '■' : ' ')).join('')).join('\n');
  console.log(output);
}

function computeNextGeneration(grid) {
  const nextGrid = createEmptyGrid(ROWS, COLS);

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const aliveNeighbors = countAliveNeighbors(grid, row, col);
      const isAlive = grid[row][col] === 1;

      nextGrid[row][col] = (isAlive && (aliveNeighbors === 2 || aliveNeighbors === 3)) || (!isAlive && aliveNeighbors === 3) ? 1 : 0;
    }
  }

  return nextGrid;
}

function countAliveNeighbors(grid, row, col) {
  let aliveCount = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const neighborRow = row + i;
      const neighborCol = col + j;

      if (neighborRow >= 0 && neighborRow < ROWS && neighborCol >= 0 && neighborCol < COLS) {
        aliveCount += grid[neighborRow][neighborCol];
      }
    }
  }

  return aliveCount;
}
