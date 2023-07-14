const fs = require('fs');
let puzzle = fs.readFileSync('puzzle.txt', 'utf8');

// Remove all commas and colons to have clean string 
puzzle = puzzle.replace(/[,]|[:]/g, '');

// Split string into array of strings by new line in order to easily use it
puzzle = puzzle.split('\n');

let sues = [];

let sueToFind = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
}

for (let line of puzzle) {
    let parts = line.split(' ');
    let sue = {
        name: parts[0] + ' ' + parts[1],
        [parts[2]]: Number(parts[3]),
        [parts[4]]: Number(parts[5]),
        [parts[6]]: Number(parts[7])
    }
    sues.push(sue);
}

for (let sue of sues) {

    let found = true;

    // Check if all properties of the sue are the same as the properties of the sue to find
    for (let prop in sue) {
        if (prop === 'name') {
            continue;
        }
        if (sue[prop] !== sueToFind[prop]) {
            found = false;
            break;
        }
    }

    if (found) {
        console.log('Answer 1: ', sue.name);
    }
}

for (let sue of sues) {

    let found = true;

    // Check if all properties of the sue are the same as the properties of the sue to find, but with some exceptions for cats and trees and pomeranians and goldfish where the values are greater or lower than the sue to find
    for (let prop in sue) {

        if (prop === 'name') {
            continue;
        }

        if (prop === 'cats' || prop === 'trees') {
            if (sue[prop] <= sueToFind[prop]) {
                found = false;
                break;
            } 
        } else if (prop === 'pomeranians' || prop === 'goldfish') {
            if (sue[prop] >= sueToFind[prop]) {
                found = false;
                break;
            } 
        } else if (sue[prop] !== sueToFind[prop]) {
            found = false;
            break;
        }
    }

    if (found) {
        console.log('Answer 2: ', sue.name);
    }
}