const fs = require('fs');
const CryptoJS = require("crypto-js");
const data = fs.readFileSync('puzzle.txt');
const puzzle = data.toString();

const solvePuzzle1 = () => {
    let i = 0;
    while (CryptoJS.MD5(puzzle+i.toString()).toString(CryptoJS.enc.Hex).substring(0, 5) != '00000') {
        i++;
    }
    return i;
}

console.log('Part 1 : ', solvePuzzle1());