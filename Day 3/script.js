const fs = require('fs');
const data = fs.readFileSync('puzzle.txt');
const puzzle = data.toString();

const solvePuzzle1 = () => {
    let positionsVisited = [[0, 0]];
    let currentPosition = [0, 0];

    const calculateNewPosition = (input, currentPosition) => {
        let newPosition = [...currentPosition]
        switch (input) {
            case 'v' :
                newPosition[1] -= 1;
                break;
            case '>' :
                newPosition[0] += 1;
                break;
            case '^' :
                newPosition[1] += 1;
                break;
            case '<' :
                newPosition[0] -= 1;
                break;
        }
        return newPosition;
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
        currentPosition = calculateNewPosition((puzzle[index]), currentPosition);
        if ( !arrayIncluded(currentPosition, positionsVisited) ) {
            positionsVisited.push(currentPosition);
        }
    }
    return positionsVisited.length;
}

console.log('Part 1 :', solvePuzzle1());