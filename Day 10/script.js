const fs = require('fs');
const data = fs.readFileSync('puzzle.txt');
const puzzle = data.toString();

//read a string following the rules of the game "Look and Say" and return the result
const lookAndSay = (string) => {

    // Separate same characaters of a string in an array of substrings
    const separateSameChars = (string) => {

        let result = [];
        let currentChar = string[0];
        let currentSubString = currentChar;
    
        for (let i = 1; i < string.length; i++) {
            if (string[i] === currentChar) {
                currentSubString += string[i];
            } else {
                result.push(currentSubString);
                currentChar = string[i];
                currentSubString = currentChar;
            }
        }

        result.push(currentSubString);
        return result;

    }

    let result = '';
    let sameChars = separateSameChars(string);

    // Build the result string, just taking the length of each substring and the first character, following the rules of the game
    for (let string of sameChars) {
        result += `${string.length}${string[0]}`;
    }

    return result;

}

//read a string following the rules of the game "Look and Say" x times and return the result
const lookAndSayXTimes = (string, times) => {

    let result = string;

    for (let i = 0; i < times; i++) {
        result = lookAndSay(result);
    }

    return result;

}

console.log('Answer 1 is : ', lookAndSayXTimes(puzzle, 40).length);
console.log('Answer 2 is : ', lookAndSayXTimes(puzzle, 50).length);