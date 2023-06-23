const fs = require('fs');
const data = fs.readFileSync('puzzle.txt');
const puzzle = data.toString();

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
            gridArray[x][y] = false;
        }
    }

    return grid;
}

let grid = makeGrid(1000, 1000);

const activateLights = (grid, start, end) => {
    
        let gridArray = grid.gridArray;
    
        for (let x = start[0]; x <= end[0]; x++) {
            for (let y = start[1]; y <= end[1]; y++) {
                gridArray[x][y] = true;
            }
        }
    
        return grid;
}

const disactivateLights = (grid, start, end) => {

    let gridArray = grid.gridArray;

    for (let x = start[0]; x <= end[0]; x++) {
        for (let y = start[1]; y <= end[1]; y++) {
            gridArray[x][y] = false;
        }
    }

    return grid;
}

const toggleLights = (grid, start, end) => {

    let gridArray = grid.gridArray;

    for (let x = start[0]; x <= end[0]; x++) {
        for (let y = start[1]; y <= end[1]; y++) {
            gridArray[x][y] = !gridArray[x][y];
        }
    }

    return grid;
}

const runInstructions = (instructions) => {

    let start;
    let end;
    const arrayOfInstructions = instructions.split('\n');

    for (let instruction of arrayOfInstructions) {
        let instructionSeparated = instruction.split(' ');
        if (instructionSeparated[0] === 'toggle') {
            start = instructionSeparated[1].split(',').map(Number);
            end = instructionSeparated[3].split(',').map(Number);
            toggleLights(grid, start, end);
        } else if (instructionSeparated[1] === 'on') {
            start = instructionSeparated[2].split(',').map(Number);
            end = instructionSeparated[4].split(',').map(Number);
            activateLights(grid, start, end);
        } else if (instructionSeparated[1] === 'off') {
            start = instructionSeparated[2].split(',').map(Number);
            end = instructionSeparated[4].split(',').map(Number);
            disactivateLights(grid, start, end);
        }
    }
}

const countLights = (grid) => {

    let gridArray = grid.gridArray;
    let gridCol = grid.col;
    let gridRow = grid.row;
    let count = 0;

    for (let x = 0; x < gridCol; x++) {
        for (let y = 0; y < gridRow; y++) {
            if (gridArray[x][y]) {
                count++;
            }
        }
    }

    return count;
}

const solvePuzzle = (puzzle) => {
    runInstructions(puzzle);
    let count = countLights(grid);
    return count;
}

console.log(solvePuzzle(puzzle));