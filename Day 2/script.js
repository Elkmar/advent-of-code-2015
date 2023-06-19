const fs = require('fs');

const data = fs.readFileSync("puzzle.txt");
const puzzle = data.toString();
const puzzleArray = puzzle.split(/\r?\n/);

const solvePuzzle1 = () => {
    const puzzleArray = puzzle.split(/\r?\n/);
    const puzzleArrayCleaned = puzzleArray.map((item) => {
        let dimensions = item.split('x');
        return dimensions.map(Number);
    });

    let answer = puzzleArrayCleaned.reduce((acc, item) => {
        let l = item[0];
        let w = item[1];
        let h = item[2];
        let smallestSide = Math.min(l*w, w*h, h*l);
        let surfaceArea = 2*l*w + 2*w*h + 2*h*l;
        let total = surfaceArea + smallestSide;
        return acc += total;
    }, 0);
    return answer;
}

const solvePuzzle2 = () => {
    const puzzleArrayCleaned = puzzleArray.map((item) => {
        let dimensions = item.split('x');
        return dimensions.map(Number);
    });

    let answer = puzzleArrayCleaned.reduce((acc, item) => {
        let l = item[0];
        let w = item[1];
        let h = item[2];
        let volume = l * w * h;
        let smallestSide = Infinity;
        let secondSmallestSide = Infinity;

        for (let dimension of item) {
            if (dimension < smallestSide) {
                secondSmallestSide = smallestSide;
                smallestSide = dimension;
            } else if (dimension < secondSmallestSide) {
                secondSmallestSide = dimension;
            }
        }

        let bow = (smallestSide + secondSmallestSide) * 2;
        let total = volume + bow;

        return acc += total;
    }, 0);
    return answer;
}

console.log('Part 1 : ', solvePuzzle1());
console.log('Part 2 : ', solvePuzzle2());