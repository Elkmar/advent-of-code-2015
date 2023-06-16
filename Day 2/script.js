const fs = require('fs');

const solvePuzzle1 = (file) => {
    fs.readFile(file, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const puzzle = data.toString();
            const puzzleArray = puzzle.split(/\r?\n/);
            const puzzleArrayCleaned = puzzleArray.map((item) => {
                let dimensions = item.split('x');
                return dimensions.map(Number);
            });

            answer = puzzleArrayCleaned.reduce((acc, item) => {
                let l = item[0];
                let w = item[1];
                let h = item[2];
                let smallestSide = Math.min(l*w, w*h, h*l);
                let surfaceArea = 2*l*w + 2*w*h + 2*h*l;
                let total = surfaceArea + smallestSide;
                return acc += total;
            }, 0);

            console.log("Part 1 ", answer);
        }
    });
};

solvePuzzle1('./puzzle.txt');

