const fs = require('fs');
const puzzle = Number(fs.readFileSync('./puzzle.txt', 'utf-8'));

let targetGifts = puzzle;

// Find the minimum house number that receives at least 'targetGifts' gifts, visitMax is the number of maximum visits per elf, gifts is the number of gifts per elf per visit 
const findMinimumHouse = (visitMax, gifts, targetGifts) => {
    let houseGifts = {};
    let minimumHouse = Infinity;

    for (let elf = 1; elf <= targetGifts / 10; elf++) {

        let visits = 0;

        // The elf visits all houses that are a multiple of its number
        for (let house = elf; house < targetGifts / 10 && visits < visitMax ; house += elf) {

            if(!houseGifts[house]){
                houseGifts[house] = 0;
            }

            houseGifts[house] += gifts * elf;

            if (houseGifts[house] >= targetGifts && house < minimumHouse) {
            minimumHouse = house;
            }

            visits++;
        }
    }
    return minimumHouse;
} 

console.log(`Answer 1: ${findMinimumHouse(Infinity, 10, targetGifts)}`);
console.log(`Answer 2: ${findMinimumHouse(50, 11, targetGifts)}`);