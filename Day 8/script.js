const fs = require('fs');
const data = fs.readFileSync('puzzle.txt');
const puzzle = data.toString();
const arrayOfStrings = puzzle.split('\n');

//Calculate the number of characters in memory, only .length is needed
const calculateCharactersInCode = (arrayOfStrings) => {
    let totalLength = 0;

    for (let string of arrayOfStrings) {
        totalLength += string.length;
    }

    return totalLength;
}

const calculateCharactersInMemory = (arrayOfStrings) => {
    let totalLength = 0;

    for (let line of arrayOfStrings) {
        totalLength += eval(line).length;
    }

    return totalLength;
}

const addEncodedCharacters = (arrayOfStrings) => {
    let totalLength = 0;

    for (let line of arrayOfStrings) {
        totalLength += JSON.stringify(line).length;
    }

    return totalLength;
}

console.log('Answer 1: ', calculateCharactersInCode(arrayOfStrings) - calculateCharactersInMemory(arrayOfStrings));
console.log('Answer 2: ', addEncodedCharacters(arrayOfStrings) - calculateCharactersInCode(arrayOfStrings));