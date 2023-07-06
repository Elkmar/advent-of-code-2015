const fs = require('fs');
const data = fs.readFileSync('puzzle.txt');
const puzzle = data.toString();
const alphabet = 'abcdefghijklmnopqrstuvwxyz';


const createNewPassword = (string) => {

    // Increment a string with the same behavior as numbers, xy becomes xz, xz becomes ya, etc.
    const incrementString = (string) => {

        let lastChar = string[string.length - 1];

        // If the last character is z, increment the rest of the string and add an a using recursion
        if (lastChar === 'z') {

            let newString = incrementString(string.slice(0, string.length - 1)) + 'a';
            return newString;
            
        } else {
            
            let rest = string.slice(0, string.length - 1);
            let index = alphabet.indexOf(lastChar);
            let newChar = alphabet[index + 1];

            let newString = rest + newChar;

            return newString;
        }
    }

    const checkIncreasingStraightOf3Letters = (string) => {

        if (string.length < 3) {
            return false;
        }

        for (i = 0; i < string.length - 2; i++) {

            let firstChar = string[i];
            let secondChar = string[i + 1];
            let thirdChar = string[i + 2];

            let firstIndex = alphabet.indexOf(firstChar);
            let secondIndex = alphabet.indexOf(secondChar);
            let thirdIndex = alphabet.indexOf(thirdChar);

            if (firstIndex + 1 === secondIndex && secondIndex + 1 === thirdIndex) {
                return true;
            }
        }

        return false;

    }

    // Check if the string contains forbidden characters i, o or l
    const checkForForbiddenCharacters = (string) => {

        if (string.includes('i') || string.includes('o') || string.includes('l')) {
            return true;
        } else {
            return false;
        }

    }

    // Check if the string contains at least two different non-overlapping pairs of letters
    const checkForTwoPairs = (string) => {

        let pairs = 0;
        let charInPair = undefined;

        for (i = 0; i < string.length - 1; i++) {
            let firstChar = string[i];
            let secondChar = string[i + 1];

            if (firstChar === secondChar && firstChar !== charInPair) {
                pairs++;
                i++;
                charInPair = firstChar;
            }
        }

        if (pairs >= 2) {
            return true;
        } else {
            return false;
        }
    }
    
    let newPassword = incrementString(string);

    while (!checkIncreasingStraightOf3Letters(newPassword) || checkForForbiddenCharacters(newPassword) || !checkForTwoPairs(newPassword)) {
        newPassword = incrementString(newPassword);
    }

    return newPassword;
}

console.log('Answer 1 : ' + createNewPassword(puzzle));
console.log('Answer 2 : ' + createNewPassword(createNewPassword(puzzle)));