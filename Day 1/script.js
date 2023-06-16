const fs = require('fs');

const solvePuzzle1 = (file) => {
    console.time('challenge 1');
    fs.readFile(file, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const puzzle = data.toString();
            let floor = 0;
            let index = 0;
            let found = false;
    
            for (let char of puzzle) {
                if ( char === "(") {
                    floor += 1;
                } else if (char ===")") {
                    floor -= 1;
                }
                index += 1;
            }
            console.log("Santa is at floor ", floor);
            console.timeEnd('challenge 1');
        }
    });
};

const solvePuzzle2 = (file) => {
    console.time('challenge 2');
    fs.readFile(file, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const puzzle = data.toString();
            let floor = 0;
            let index = 0;

            for (let char of puzzle) {
                if ( char === "(") {
                    floor += 1;
                } else if (char ===")") {
                    floor -= 1;
                }
                
                index += 1;

                if (floor === -1) {
                    console.log('Basement entered at position: ', index);
                    console.timeEnd('challenge 2');
                    break;
                }
            }
        }
    });
};

solvePuzzle1('./puzzle.txt');
solvePuzzle2('./puzzle.txt');