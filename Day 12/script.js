const fs = require('fs');
const data = fs.readFileSync('puzzle.txt');
const puzzle = JSON.parse(data);

//add all numbers found in the object, an array is considered as an object
const sumAllNumbers = (obj) => {

    let sum = 0;

    for (let key in obj) {
        if (typeof obj[key] === 'number') {
            sum += obj[key];
        } else if (typeof obj[key] === 'object') {
            sum += sumAllNumbers(obj[key]);
        }
    };

    return sum;
}

//add all numbers found in the object, except if the object contains the value 'red', the rule don't apply to arrays
const summAllNumbersWithoutRed = (obj) => {
    
    let sum = 0;

    for (let key in obj) {
        if (typeof obj[key] === 'number') {
            sum += obj[key];
        } else if (Array.isArray(obj[key])) {
            sum += summAllNumbersWithoutRed(obj[key]);
        } else if (typeof obj[key] === 'object') {
            if (!Object.values(obj[key]).includes('red')) {
                sum += summAllNumbersWithoutRed(obj[key]);
            }
        }
    }
    return sum;
}

console.log('Answer 1 :', sumAllNumbers(puzzle));
console.log('Answer 2 :', summAllNumbersWithoutRed(puzzle));