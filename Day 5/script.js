const fs = require('fs');
const data = fs.readFileSync('puzzle.txt');
const puzzle = data.toString();
const arrayOfStrings = puzzle.split(/\r?\n/);

const check3diffVowels = (string) => {
    let vowelsFound = '';
    for (let char of string) {
        for (let vowel of "aeiou") {
            if (char === vowel) {
                vowelsFound += char;
            }
        }
    }

    if (vowelsFound.length > 2) {
        return true;
    } else {
        return false;
    }
}

const checkDoubleLetter = (string) => {
    let prevChar = undefined;
    for (let char of string) {
        if (prevChar === char) {
            return true;
        }
        prevChar = char;
    }
    return false;
}

const checkProhibitedStrings = (string) => {
    let subStrings = [];
    let prohibitedStrings = ['ab', 'cd', 'pq', 'xy'];
    for (let i = 0; i < (string.length - 1); i++) {
        let substring = string.substring(i, i+2)
        subStrings.push(substring);
    }
    for (let prohibitedString of prohibitedStrings) {
        if (subStrings.includes(prohibitedString)) {
            return true;
        }
    }
    return false;
}

const solvePuzzle1 = () => {
    let niceStrings = 0;
    for (string of arrayOfStrings) {
        if (check3diffVowels(string) && checkDoubleLetter(string) && !checkProhibitedStrings(string)) {
            niceStrings ++;
        }
    }
    return niceStrings;
}

console.log(solvePuzzle1());