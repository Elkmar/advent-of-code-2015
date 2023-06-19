const fs = require('fs');

const solvePuzzle1 = (file) => {
    const data = fs.readFileSync(file);
    const puzzle = data.toString();
    let positionsVisited = [[0, 0]];
    let currentPosition = [0, 0];

    const calculateNewPosition = (input, currentPosition) => {
        switch (input) {
            case 'v' :
                currentPosition[1] -= 1;
                break;
            case '>' :
                currentPosition[0] += 1;
                break;
            case '^' :
                currentPosition[1] += 1;
                break;
            case '<' :
                currentPosition[0] -= 1;
                break;
        }
        return currentPosition;
    }

    const arrayIncluded = (arrayCompared, setOfArray) => {
        for (let array of setOfArray) {
            if (array[0] === arrayCompared[0] && array[1] === arrayCompared[1] ) {
                return true;
            }
        }
        return false;
    }
    
    for (let index = 0; index < puzzle.length; index++) {
        let newPosition = [...calculateNewPosition((puzzle[index]), currentPosition)];
        if ( !arrayIncluded(newPosition, positionsVisited) ) {
            positionsVisited.push(newPosition);
        }
    }
    return positionsVisited.length;
}

console.log('Part 1 :', solvePuzzle1('./puzzle.txt'));