const fs = require('fs');
let puzzle = fs.readFileSync('puzzle.txt', 'utf-8');
puzzle = puzzle.split('\n');

// Create a grid of col x row size
const makeGrid = (col, row) => {

    let grid = { 
        gridArray: [],
        col: col,
        row: row
    };

    let gridArray = grid.gridArray;

    for (let x = 0; x < col; x++) {
        gridArray[x] = [];
        for (let y = 0; y < row; y++) {
            gridArray[x][y] = 0;
        }
    }

    return grid;
}

const grid = makeGrid(100, 100);

// Fill the grid with the puzzle input
for (let rowIndex = 0; rowIndex < puzzle.length; rowIndex++) {
    let row = puzzle[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
        let col = row[colIndex];
        if (col === '#') {
            grid.gridArray[rowIndex][colIndex] = true;
        } else {
            grid.gridArray[rowIndex][colIndex] = false;
        }
    }
}

// Check the neighbours of a cell
const checkNeighbours = (grid, x, y) => {

    let neighbours = 0;

    for(let dx = -1; dx <= 1; dx++) {
        for(let dy = -1; dy <= 1; dy++) {

            // Skip the current cell
            if(dx === 0 && dy === 0) continue;

            // Compute the neighbor's coordinates
            let nx = x + dx;
            let ny = y + dy;

            // Check if the neighbor's coordinates are in the grid's bounds
            if(nx >= 0 && nx < grid.col && ny >= 0 && ny < grid.row) {
                if(grid.gridArray[nx][ny]) {
                    neighbours++;
                }
            }
        }
    }

    return neighbours;
}

// Animate the grid x times following the rules
const animateGridXtimes = (grid, times) => {

    const animateGrid = (grid) => {

        // Create a new grid to store the new state and not have the modifcations affect the current state and thus the outcome
        let newGrid = JSON.parse(JSON.stringify(grid));

        for (let x = 0; x < grid.col; x++) {
            for (let y = 0; y < grid.row; y++) {
    
                let neighbours = checkNeighbours(grid, x, y);
    
                if (grid.gridArray[x][y]) {
                    if (neighbours === 2 || neighbours === 3) {
                        newGrid.gridArray[x][y] = true;
                    } else {
                        newGrid.gridArray[x][y] = false;
                    }
                } else {
                    if (neighbours === 3) {
                        newGrid.gridArray[x][y] = true;
                    } else {
                        newGrid.gridArray[x][y] = false;
                    }
                }
            }
        }
        return newGrid;
    }
    
    for (let i = 0; i < times; i++) {
        grid = animateGrid(grid);
    }
    
    return grid;
}

// Count the number of lights on
const countLightsOn = (grid) => {
    
    let lightsOn = 0;

    for (let x = 0; x < grid.col; x++) {
        for (let y = 0; y < grid.row; y++) {
            if (grid.gridArray[x][y]) {
                lightsOn++;
            }
        }
    }

    return lightsOn;
}

const answer1 = countLightsOn(animateGridXtimes(grid, 100));

console.log('Answer 1: ', answer1);

// Turn on the corners
grid.gridArray[0][0] = true;
grid.gridArray[0][99] = true;
grid.gridArray[99][0] = true;
grid.gridArray[99][99] = true;

// Animate the grid x times following the rules but with the corners always on
const animateGridXtimesWithCorners = (grid, times) => {

    const animateGrid = (grid) => {

        let newGrid = JSON.parse(JSON.stringify(grid));

        for (let x = 0; x < grid.col; x++) {
            for (let y = 0; y < grid.row; y++) {

                // Skip the corners
                if ((x === 0 && y === 0) || (x === 0 && y === 99) || (x === 99 && y === 0) || (x === 99 && y === 99)) {
                    continue;
                }

                let neighbours = checkNeighbours(grid, x, y);
    
                if (grid.gridArray[x][y]) {
                    if (neighbours === 2 || neighbours === 3) {
                        newGrid.gridArray[x][y] = true;
                    } else {
                        newGrid.gridArray[x][y] = false;
                    }
                } else {
                    if (neighbours === 3) {
                        newGrid.gridArray[x][y] = true;
                    } else {
                        newGrid.gridArray[x][y] = false;
                    }
                }
            }
        }
        return newGrid;
    }
    
    for (let i = 0; i < times; i++) {
        grid = animateGrid(grid);
    }
    
    return grid;
}

const answer2 = countLightsOn(animateGridXtimesWithCorners(grid, 100));

console.log('Answer 2: ', answer2);