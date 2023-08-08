const { debug } = require('console');
const fs = require('fs');
const puzzle = fs.readFileSync('./puzzle.txt', 'utf-8').split('\n');

const executeInstructions = (instructions, a, b) => {
        
    for (let index = 0; index < instructions.length; index++) {
        
        let instruction = instructions[index].split(' ');
        let operation = instruction[0];
        let argument = instruction[1].replace(',', '').replace('+', '');
        let third = instruction.length === 3 ? Number(instruction[2].substring(1)) : null;

        switch (operation) {
            case 'hlf':
                argument = argument === 'a' ? a /= 2 : b /= 2;
                break;
            case 'tpl':
                argument = argument === 'a' ? a *= 3 : b *= 3;
                break;
            case 'inc':
                argument = argument === 'a' ? a++ : b++;
                break;
            case 'jmp':
                index += Number(argument) - 1;
                break;
            case 'jie':
                if (argument === 'a') {
                    if (a % 2 === 0) {
                        index += third - 1;
                    }
                } else {
                    if (b % 2 === 0) {
                        index += third - 1;
                    }
                }
                break;
            case 'jio':
                if (argument === 'a') {
                    if (a === 1) {
                        index += third - 1;
                    }
                } else {
                    if (b === 1) {
                        index += third - 1;
                    }
                }
                break;
            default:
                console.log('Invalid instruction');
                break;     
        }
    }
    return b;
}

console.log('Answer 1:', executeInstructions(puzzle, 0, 0));
console.log('Answer 2:', executeInstructions(puzzle, 1, 0));