const fs = require("fs");
const puzzle = fs.readFileSync("./puzzle.txt", "utf-8").split("\n");
const boss = {hp: parseInt(puzzle[0].split(": ")[1]), damage: parseInt(puzzle[1].split(": ")[1]), armor: parseInt(puzzle[2].split(": ")[1])}
const player = { hp: 100, damage: 0, armor: 0 };

let weapons = [
    { name: "Dagger", cost: 8, damage: 4, armor: 0 },
    { name: "Shortsword", cost: 10, damage: 5, armor: 0 },
    { name: "Warhammer", cost: 25, damage: 6, armor: 0 },
    { name: "Longsword", cost: 40, damage: 7, armor: 0 },
    { name: "Greataxe", cost: 74, damage: 8, armor: 0 }
];

let armors = [
    { name: "None", cost: 0, damage: 0, armor: 0 },
    { name: "Leather", cost: 13, damage: 0, armor: 1 },
    { name: "Chainmail", cost: 31, damage: 0, armor: 2 },
    { name: "Splintmail", cost: 53, damage: 0, armor: 3 },
    { name: "Bandedmail", cost: 75, damage: 0, armor: 4 },
    { name: "Platemail", cost: 102, damage: 0, armor: 5 }
];

let rings = [
    { name: "None", cost: 0, damage: 0, armor: 0 },
    { name: "Damage +1", cost: 25, damage: 1, armor: 0 },
    { name: "Damage +2", cost: 50, damage: 2, armor: 0 },
    { name: "Damage +3", cost: 100, damage: 3, armor: 0 },
    { name: "Defense +1", cost: 20, damage: 0, armor: 1 },
    { name: "Defense +2", cost: 40, damage: 0, armor: 2 },
    { name: "Defense +3", cost: 80, damage: 0, armor: 3 }
];

// Simulate a fight between the player and the enemy, return true if the player wins or false if he loses
const simulateFight = (player, enemy) => {
    let playerTurn = true;
    let Victory = false;
    let playerOriginalHp = player.hp;
    let enemyOriginalHp = enemy.hp;

    // Reset the stats of the player and the enemy at the end of the fight
    const resetStats = (player, enemy) => {
        player.hp = playerOriginalHp;
        enemy.hp = enemyOriginalHp;
    }

    while (player.hp > 0 && enemy.hp > 0) {
        if (playerTurn) {
            enemy.hp -= Math.max(1, player.damage - enemy.armor);
        } else {
            player.hp -= Math.max(1, enemy.damage - player.armor);
        }
        playerTurn = !playerTurn;
    }

    if (player.hp > 0) {
        Victory = true;
    }

    resetStats(player, enemy);

    return Victory;
}

// Find the minimum cost of the equipment to win the fight by going through all the possible combinations
const findMinCost = (player, enemy) => {

    let minCost = Infinity;
    let minEquipment = [];
    
    for (let weapon of weapons) {
        for (let armor of armors) {
            for (let ring1 of rings) {
                for (let ring2 of rings.filter(ring => ring.name !== ring1.name || ring.name === "None")) {
                    
                    player.damage = weapon.damage + armor.damage + ring1.damage + ring2.damage;
                    player.armor = weapon.armor + armor.armor + ring1.armor + ring2.armor;
                    const cost = weapon.cost + armor.cost + ring1.cost + ring2.cost;
                    
                    if (simulateFight(player, enemy) && cost < minCost) {
                        minCost = cost;
                        minEquipment = [weapon.name, armor.name, ring1.name, ring2.name];
                    }
                }
            }
        }
    }

    return [minCost, minEquipment];
}

[minCost, minEquipment] = findMinCost(player, boss);

console.log(`The minimum cost to win the fight is ${minCost} with the following equipment: ${minEquipment}`);

// Find the maximum cost of the equipment to lose the fight by going through all the possible combinations
const findMaxCost = (player, enemy) => {

    let maxCost = 0;
    let maxEquipment = [];
    
    for (let weapon of weapons) {
        for (let armor of armors) {
            for (let ring1 of rings) {
                for (let ring2 of rings.filter(ring => ring.name !== ring1.name || ring.name === "None")) {
                    
                    player.damage = weapon.damage + armor.damage + ring1.damage + ring2.damage;
                    player.armor = weapon.armor + armor.armor + ring1.armor + ring2.armor;
                    const cost = weapon.cost + armor.cost + ring1.cost + ring2.cost;
                    
                    if (!simulateFight(player, enemy) && cost > maxCost) {
                        maxCost = cost;
                        maxEquipment = [weapon.name, armor.name, ring1.name, ring2.name];
                    }
                }
            }
        }
    }

    return [maxCost, maxEquipment];
}

[maxCost, maxEquipment] = findMaxCost(player, boss);

console.log(`The maximum cost to lose the fight is ${maxCost} with the following equipment: ${maxEquipment}`);