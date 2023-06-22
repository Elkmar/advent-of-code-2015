const fs = require('fs');
const data = fs.readFileSync('puzzle.txt');
const puzzle = data.toString();
const arrayOfStrings = puzzle.split(/\r?\n/);

const solvePuzzle1 = () => {

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
        let substrings = [];
        let prohibitedStrings = ['ab', 'cd', 'pq', 'xy'];
        for (let i = 0; i < (string.length - 1); i++) {
            let substring = string.substring(i, i+2)
            substrings.push(substring);
        }
        for (let prohibitedString of prohibitedStrings) {
            if (substrings.includes(prohibitedString)) {
                return true;
            }
        }
        return false;
    }

    const checkAllRules = (string) => {
        if (check3diffVowels(string) && checkDoubleLetter(string) && !checkProhibitedStrings(string)) {
            return true;
        } else {
            return false;
        }
    }

    let niceStrings = 0;
    
    for (let string of arrayOfStrings) {
        if (checkAllRules(string)) {
            niceStrings ++;
        }
    }
    return niceStrings;
}

const solvePuzzle2 = () => {

    const checkDoublePairOfLetters = (string) => {
        let substrings = [];
        for (let i = 0; i < (string.length - 1); i++) {
            let substring = string.substring(i, i+2)
            substrings.push(substring);
        }

        for (let i = 0; i < substrings.length; i++) {
            for (let j = i + 2; j < substrings.length; j++) {
                if (substrings[i] === substrings[j]) {
                    return true;
                }
            }
        }
        return false;
    }
    
    const checkPairSeparatedByOneLetter = (string) => {
        let substrings = [];
        for (let i = 0; i < (string.length - 2); i++) {
            let substring = string.substring(i, i+3)
            substrings.push(substring);
        }
        for (let subString of substrings) {
            if (subString[0] === subString[2]) {
                return true
            }
        }
        return false;
    }

    const checkAllRules = (string) => {
        if (checkDoublePairOfLetters(string) && checkPairSeparatedByOneLetter(string)) {
            return true;
        } else {
            return false;
        }
    }

    let niceStrings = 0;

    for (let string of arrayOfStrings) {
        if (checkAllRules(string)) {
            niceStrings ++;
        }
    }
    return niceStrings;
}

console.log(solvePuzzle1());
console.log(solvePuzzle2());