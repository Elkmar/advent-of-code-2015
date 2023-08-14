const fs = require('fs');
const puzzle =  fs.readFileSync('./puzzle.txt', 'utf-8');
const weightsArray = puzzle.split('\n').map((weight) => parseInt(weight));
const weightsDescendingOrder = weightsArray.sort((a, b) => b - a);

//Calculate the quantum Entanglement of the first group when the best combination is found, with 3 groups
const quantumEntanglementBestCombination1 = (weights) => {

    let bestCombination = null;

    // Calculate the weight of a group of weights
    const calculateWeight = (group) => {
        return group.reduce((acc, weight) => acc + weight, 0);
    }

    let totalWeight = calculateWeight(weights);

    // Calculate the quantum entanglement of a group of weights
    const calculateQuantumEntanglement = (group) => {
        return group.reduce((acc, weight) => acc * weight, 1);
    }

    const distributeWeights = (index, group1, group2, group3) => {

        // If we've reached the end of the weights array, we can stop and check if we have a new best combination
        if (index === weights.length) {
          if (calculateWeight(group1) === calculateWeight(group2) &&
              calculateWeight(group2) === calculateWeight(group3) &&
              (bestCombination === null || group1.length < bestCombination.length ||
               (group1.length === bestCombination.length &&
                calculateQuantumEntanglement(group1) < calculateQuantumEntanglement(bestCombination)))) {
            bestCombination = group1.slice();
          }
          return;
        }

        // If the current group is already heavier than the target weight, we can stop
        if (calculateWeight(group1) > totalWeight / 3 ||
            calculateWeight(group2) > totalWeight / 3 ||
            calculateWeight(group3) > totalWeight / 3) {
          return;
        }

        // If we already have a best combination and the current group is longer than it, we can stop
        if (bestCombination !== null && group1.length > bestCombination.length) {
            return;
        }

        group1.push(weights[index]);
        distributeWeights(index + 1, group1, group2, group3);
        group1.pop();

        group2.push(weights[index]);
        distributeWeights(index + 1, group1, group2, group3);
        group2.pop();

        group3.push(weights[index]);
        distributeWeights(index + 1, group1, group2, group3);
        group3.pop();
    }
    distributeWeights(0, [], [], []);
    return calculateQuantumEntanglement(bestCombination);
}

console.log('Answer 1: ', quantumEntanglementBestCombination1(weightsDescendingOrder));

//Calculate the quantum Entanglement of the first group when the best combination is found, with 4 groups
const quantumEntanglementBestCombination2 = (weights) => {

    let bestCombination = null;

    // Calculate the weight of a group of weights
    const calculateWeight = (group) => {
        return group.reduce((acc, weight) => acc + weight, 0);
    }

    let totalWeight = calculateWeight(weights);

    // Calculate the quantum entanglement of a group of weights
    const calculateQuantumEntanglement = (group) => {
        return group.reduce((acc, weight) => acc * weight, 1);
    }

    const distributeWeights = (index, group1, group2, group3, group4) => {

        // If we've reached the end of the weights array, we can stop and check if we have a new best combination
        if (index === weights.length) {
          if (calculateWeight(group1) === calculateWeight(group2) &&
              calculateWeight(group2) === calculateWeight(group3) && 
              calculateWeight(group3) === calculateWeight(group4) &&
              (bestCombination === null || group1.length < bestCombination.length || (group1.length === bestCombination.length &&
                calculateQuantumEntanglement(group1) < calculateQuantumEntanglement(bestCombination)))) {
                    bestCombination = group1.slice();
                    console.log('bestCombination', bestCombination);
                }
          return;
        }

        // If the current group is already heavier than the target weight, we can stop
        if (calculateWeight(group1) > totalWeight / 4 ||
            calculateWeight(group2) > totalWeight / 4 ||
            calculateWeight(group3) > totalWeight / 4 || 
            calculateWeight(group4) > totalWeight / 4) {
          return;
        }

        // If we already have a best combination and the current group is longer than it, we can stop
        if (bestCombination !== null && (group1.length > bestCombination.length || calculateQuantumEntanglement(group1) > calculateQuantumEntanglement(bestCombination))) {
            return;
        }

        group1.push(weights[index]);
        distributeWeights(index + 1, group1, group2, group3, group4);
        group1.pop();

        group2.push(weights[index]);
        distributeWeights(index + 1, group1, group2, group3, group4);
        group2.pop();

        group3.push(weights[index]);
        distributeWeights(index + 1, group1, group2, group3, group4);
        group3.pop();

        group4.push(weights[index]);
        distributeWeights(index + 1, group1, group2, group3, group4);
        group4.pop();
    }

    distributeWeights(0, [], [], [], []);
    return calculateQuantumEntanglement(bestCombination);
}

console.log('Answer 2: ', quantumEntanglementBestCombination2(weightsDescendingOrder));