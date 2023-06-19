const fs = require('fs');

const data = fs.readFileSync("puzzle.txt");
const puzzle = data.toString();

const solvePuzzle1 = () => {
    let floor = 0;
    let index = 0;

    for (let char of puzzle) {
        if ( char === "(") {
            floor += 1;
        } else if (char ===")") {
            floor -= 1;
        }
        index += 1;
    }
    return floor;
}

const solvePuzzle2 = () => {
    let floor = 0;
    let index = 0;

    for (let char of puzzle) {
        if ( char === "(") {
            floor += 1;
        } else if (char ===")") {
            floor -= 1;
        }
        
        index += 1;

        if (floor === -1) {
            return index;
        }
    }
}


console.log('Part 1 : ', solvePuzzle1());
console.log('Part 2 : ', solvePuzzle2());