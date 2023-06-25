const fs = require('fs');
const { get } = require('http');
const data = fs.readFileSync('puzzle.txt');
const puzzle = data.toString();
const arrayOfInstructions = puzzle.split('\n');

let wireInstructions = {};
arrayOfInstructions.forEach((instruction) => {
    let parts = instruction.split(' -> ');
    wireInstructions[parts[1]] = parts[0];
});
let cache = {};

const orOperation = (a, b) => {
    return a | b;
}

const andOperation = (a, b) => {
    return a & b;
}

const notOperation = (a) => {
    return ~a;
}

const leftShiftOperation = (a, b) => {
    return a << b;
}

const rightShiftOperation = (a, b) => {
    return a >> b;
}

const getSignal = (wire) => {

    if (!isNaN(wire)) {
        return Number(wire);
    }
    
    let instruction = wireInstructions[wire];

    if (!instruction) {
        console.log('no instruction for wire: ' + wire);
        return;
    } else if (!isNaN(instruction)) {
        return Number(instruction);
    } else if (cache[wire]) {
        return cache[wire];
    }

    let parts = instruction.split(' ');

    if (parts.length === 1) {
        cache[wire] = getSignal(parts[0]);
    } else if (parts[0] === 'NOT') {
        cache[wire] = notOperation(getSignal(parts[1]));
    } else if (parts[1] === 'OR') {
        cache[wire] = orOperation(getSignal(parts[0]), getSignal(parts[2]));
    } else if (parts[1] === 'AND') {
            cache[wire] = andOperation(getSignal(parts[0]), getSignal(parts[2]));
    } else if (parts[1] === 'LSHIFT') {
        cache[wire] = leftShiftOperation(getSignal(parts[0]), Number(parts[2]));
    } else if (parts[1] === 'RSHIFT') {
        cache[wire] = rightShiftOperation(getSignal(parts[0]), Number(parts[2]));
    }

    return cache[wire];
}

const solvePuzzle1 = () => {
    return getSignal('a');
}

const solvePuzzle2 = () => {
    wireInstructions['b'] = solvePuzzle1();
    cache = {};
    return getSignal('a');
}

console.log('Answer 1: ', solvePuzzle1());
console.log('Answer 2: ', solvePuzzle2());