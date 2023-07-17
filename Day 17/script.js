const fs = require('fs');
const puzzle = fs.readFileSync('./puzzle.txt', 'utf-8')
const containers = puzzle.split('\n').map(Number);

// Find all combinations of containers that sum to 150
const findTargetCombinations = (containers, target) => {

    const combos = [];

    // Recursive function to find all combinations, starting with the first container in the list, adding it to the combo if it fits, and then calling itself again with the remaining containers and the remaining target or without the first container and the same target if it doesn't fit
    const searchCombinations = (containers, target, combo) => {
        if (target === 0) {
            combos.push(combo);
            return;
        }
        if (target < 0) {
            return;
        }
        if (containers.length === 0) {
            return;
        }
        searchCombinations(containers.slice(1), target - containers[0], combo.concat(containers[0]));
        searchCombinations(containers.slice(1), target, combo);
    }

    searchCombinations(containers, target, []);

    return combos;
}

const validCombinations = findTargetCombinations(containers, 150);

console.log('The answer is: ', validCombinations.length);

//Similar to the above, but only returns the combinations with the minimum number of containers
const findMinContainers = (containers, target) => {

    const combos = [];

    const searchCombinations = (containers, target, combo) => {
        if (target === 0) {
            combos.push(combo);
            return;
        }
        if (target < 0) {
            return;
        }
        if (containers.length === 0) {
            return;
        }
        searchCombinations(containers.slice(1), target - containers[0], combo.concat(containers[0]));
        searchCombinations(containers.slice(1), target, combo);
    }

    searchCombinations(containers, target, []);

    // Find the minimum number of containers just using the lengths of the combos gathered above, the lowest number is the minimum number of containers
    const minContainers = Math.min(...combos.map(combo => combo.length));

    console.log(minContainers);

    // Filter out all combinations that are not the minimum number of containers 
    return combos.filter(combo => combo.length === minContainers);
}

const minContainers = findMinContainers(containers, 150);

console.log('The answer is: ', minContainers.length);