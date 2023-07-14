const fs = require('fs');
const data = fs.readFileSync('puzzle.txt', 'utf8');
puzzle = data.toString();

const ingredients = [];

// Create an object for each ingredient that is pushed to the ingredients array
puzzle.split('\n').forEach((line) => {
    parts = line.split(' ');
    ingredients.push({
        name: parts[0].replace(':', ''),
        capacity: Number(parts[2].replace(',', '')),
        durability: Number(parts[4].replace(',', '')),
        flavor: Number(parts[6].replace(',', '')),
        texture: Number(parts[8].replace(',', '')),
        calories: Number(parts[10])
    });
});

// Create an array of all possible combinations of 4 numbers that add up to max
const createCombinations = (max) => {

    let combinations = [];

    for (let sprinkles = 0; sprinkles <= max; sprinkles++) {
        for (let butterscotch = 0; butterscotch <= max - sprinkles; butterscotch++) {
            for (let chocolate = 0; chocolate <= max - sprinkles - butterscotch; chocolate++) {
                for (let candy = 0; candy <= max - sprinkles - butterscotch - chocolate; candy++) {
                    if (sprinkles + butterscotch + chocolate + candy === max) {
                        combinations.push([sprinkles, butterscotch, chocolate, candy]);
                    }
                }
            }
        }
    }

    return combinations;
}

const combinations = createCombinations(100);

// Calculate the score for a combination of ingredients
const calculateScore = (combination, ingredients) => {

    let capacity = combination[0] * ingredients[0].capacity + combination[1] * ingredients[1].capacity + combination[2] * ingredients[2].capacity + combination[3] * ingredients[3].capacity;
    let durability = combination[0] * ingredients[0].durability + combination[1] * ingredients[1].durability + combination[2] * ingredients[2].durability + combination[3] * ingredients[3].durability;
    let flavor = combination[0] * ingredients[0].flavor + combination[1] * ingredients[1].flavor + combination[2] * ingredients[2].flavor + combination[3] * ingredients[3].flavor;
    let texture = combination[0] * ingredients[0].texture + combination[1] * ingredients[1].texture + combination[2] * ingredients[2].texture + combination[3] * ingredients[3].texture;

    if (capacity < 0) {
        capacity = 0;
    } else if (durability < 0) {
        durability = 0;
    } else if (flavor < 0) {
        flavor = 0;
    } else if (texture < 0) {
        texture = 0;
    }

    return capacity * durability * flavor * texture;
}

// Find the best score and combination of ingredients
const findBestScore = (combinations, ingredients) => {

    let bestScore = 0;
    let bestCombination = [];

    for (let combination of combinations) {
        let score = calculateScore(combination, ingredients);
        if (score > bestScore) {
            bestScore = score;
            bestCombination = combination;
        }
    }

    return [bestScore, bestCombination];
}

let [bestScore, bestCombination] = findBestScore(combinations, ingredients);

console.log('Answer 1 =', bestScore, bestCombination);

const calculateScoreWith500Calories = (combination, ingredients) => {

    let capacity = combination[0] * ingredients[0].capacity + combination[1] * ingredients[1].capacity + combination[2] * ingredients[2].capacity + combination[3] * ingredients[3].capacity;
    let durability = combination[0] * ingredients[0].durability + combination[1] * ingredients[1].durability + combination[2] * ingredients[2].durability + combination[3] * ingredients[3].durability;
    let flavor = combination[0] * ingredients[0].flavor + combination[1] * ingredients[1].flavor + combination[2] * ingredients[2].flavor + combination[3] * ingredients[3].flavor;
    let texture = combination[0] * ingredients[0].texture + combination[1] * ingredients[1].texture + combination[2] * ingredients[2].texture + combination[3] * ingredients[3].texture;
    let calories = combination[0] * ingredients[0].calories + combination[1] * ingredients[1].calories + combination[2] * ingredients[2].calories + combination[3] * ingredients[3].calories;

    if (capacity < 0) {
        capacity = 0;
    } else if (durability < 0) {
        durability = 0;
    } else if (flavor < 0) {
        flavor = 0;
    } else if (texture < 0) {
        texture = 0;
    } else if (calories !== 500) {
        return 0;
    }

    return capacity * durability * flavor * texture;
}

const findBestScoreWith500Calories = (combinations, ingredients) => {

    let bestScore = 0;
    let bestCombination = [];

    for (let combination of combinations) {
        let score = calculateScoreWith500Calories(combination, ingredients);
        if (score > bestScore) {
            bestScore = score;
            bestCombination = combination;
        }
    }

    return [bestScore, bestCombination];
}

let [bestScoreWith500Calories, bestCombinationWith500Calories] = findBestScoreWith500Calories(combinations, ingredients);

console.log('Answer 2 =', bestScoreWith500Calories, bestCombinationWith500Calories);