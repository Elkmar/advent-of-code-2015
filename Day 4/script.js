const fs = require('fs');
const CryptoJS = require("crypto-js");
const data = fs.readFileSync('puzzle.txt');
const puzzle = data.toString();

const calculateHash = (prefix, i) => {
    return CryptoJS.MD5(prefix+i.toString()).toString(CryptoJS.enc.Hex);
}

const solvePuzzle1 = () => {
    let i = 0;
    while (calculateHash(puzzle, i).substring(0, 5) != '00000') {
        i++;
    }
    return i;
}

const solvePuzzle2 = () => {
    let i = 0;
    while (calculateHash(puzzle, i).substring(0, 6) != '000000') {
        i++;
    }
    return i;
}

console.log('Part 1 : ', solvePuzzle1());
console.log('Part 2 : ', solvePuzzle2());