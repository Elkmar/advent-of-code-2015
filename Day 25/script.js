const fs = require('fs');
const puzzle = fs.readFileSync('./puzzle.txt', 'utf-8').split(' ');

const codeToFind = [Number(puzzle[16].replace(',', '')), Number(puzzle[18].replace('.', ''))];

//calculate the code from the row and column
const calculateCode = (row, column) => {

    //get the index of the code from the row and column, [1, 1] is [1], [1, 2] is 2, [2, 1] is 3, [3, 1] is 4, etc ...
    const getIndex = (row, col) => {
        return ((row + col - 1) * (row + col)/2) - (row - 1);
    }

    const index = getIndex(row, column);

    //first value from which we start
    let currentCode = 20151125;

    //we calculate each code from the first one
    for (let i = 1; i < index; i++) {
        currentCode = (currentCode * 252533) % 33554393;
    }

    return currentCode;
}

console.log('Answer 1:', calculateCode(codeToFind[0], codeToFind[1]));