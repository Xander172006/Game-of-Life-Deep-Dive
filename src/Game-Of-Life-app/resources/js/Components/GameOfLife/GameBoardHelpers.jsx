// create empty grid
export const createEmptyGrid = (rows, cols) => {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0)
    );
};


// generate a random grid
export const computeNextGeneration = (grid) => {
    const rows = grid.length;
    const cols = grid[0].length;

    const newGrid = createEmptyGrid(rows, cols);

    const getAliveNeighbors = (r, c) => {
        let aliveNeighbors = 0;

        // loop through neighbors
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {

                // skip the current cell
                if (i === 0 && j === 0) continue;
                    const newRow = r + i;
                    const newCol = c + j;

                // check if neighbor is within grid
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    aliveNeighbors += grid[newRow][newCol];
                }
            }
        }
        return aliveNeighbors;
    };


    // loop through each cell in the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const aliveNeighbors = getAliveNeighbors(row, col);

            // apply the rules of the game
            if (grid[row][col] === 1) {
                newGrid[row][col] = aliveNeighbors === 2 || aliveNeighbors === 3 ? 1 : 0;
            } else {
                newGrid[row][col] = aliveNeighbors === 3 ? 1 : 0;
            }
        }
    }

    return newGrid;
};