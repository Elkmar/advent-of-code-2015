const fs = require('fs');

let puzzle = fs.readFileSync('./puzzle.txt', 'utf-8').split('\n');
puzzle = puzzle.map((line) => line.split(':'));


// Stock the boss original stats 
const boss = {
    HP: Number(puzzle[0][1]),
    [puzzle[1][0]]: Number(puzzle[1][1])
}

// Stock the player original stats
const player = {
    HP: 50,
    mana: 500,
    armor: 0,
    activeSpells: []
}

// Stock the spells
const spells = [
    {name: 'Magic Missile', cost: 53, damage: 4, armor: 0, heal: 0, mana:0, duration: 0},
    {name: 'Drain', cost: 73, damage: 2, armor: 0, heal: 2, mana: 0, duration: 0},
    {name: 'Shield', cost: 113, damage: 0, armor: 7, heal: 0, mana: 0, duration: 6},
    {name: 'Poison', cost: 173, damage: 3, armor: 0, heal: 0, mana: 0, duration: 6},
    {name: 'Recharge', cost: 229, damage: 0, armor: 0, heal: 0, mana: 101, duration: 5}
];

//Apply the effects of the active spells
const applyEffects = (player, boss) => {
    for (let spell of player.activeSpells) {

        player.mana += spell[0].mana;
        boss.HP -= spell[0].damage;
        player.HP += spell[0].heal;

        spell[1]--;

        //Check if the spell is shield to remove the armor at the end of the duration
        if (spell[0].name === 'Shield' && spell[1] === 0) {
            player.armor -= spell[0].armor;
        }
    }

    //Remove the spells that have a duration of 0
    player.activeSpells = player.activeSpells.filter(spell => spell[1] > 0);
}

//Cast a spell, apply directly if it's not a duration spell, otherwise add it to the active spells
const castSpell = (spell, player, boss) => {

    player.mana -= spell.cost;
    
    if (spell.duration === 0) {

        boss.HP -= spell.damage;
        player.HP += spell.heal;

    } else {
        //Set a timer for the duration of the spell
        let timer = spell.duration;

        //Check if the spell is shield to apply the armor only once
        if (spell.name === 'Shield') {
            player.armor += spell.armor;
        }

        player.activeSpells.push([spell, timer]);
    }

}

// Play the player's turn
const playerTurn = (player, boss, spell, mode = 'normal') => {

    if (mode === 'hard') {
        player.HP--;
        if (player.HP <= 0) {
            return;
        } 
    }

    //Apply the effects of the active spells
    applyEffects(player, boss);

    if (boss.HP <= 0) {
        return;
    }

    //Cast a spell
    castSpell(spell, player, boss);
}

// Play the boss's turn
const bossTurn = (player, boss) => {

    //Apply the effects of the active spells
    applyEffects(player, boss);

    if (boss.HP <= 0) {
        return;
    }

    //Attack the player
    player.HP -= Math.max(1, boss.Damage - player.armor);
}

let minimumManaSpent = Infinity;

// Find the cheapest win using backtracking
const findCheapestWin = (currentPlayer, boss, spells, manaSpent = 0, mode) => {
    // If the currentPlayer has already spent more mana than the minimum, we can stop.
    if (manaSpent >= minimumManaSpent) {
        return;
    }

    // 
    for (let spell of spells) {

        // If the currentPlayer doesn't have enough mana to cast the spell or if the currentPlayer already has the spell active, we can skip it.
        if (currentPlayer.mana < spell.cost || currentPlayer.activeSpells.some(activeSpell => activeSpell[0].name === spell.name && activeSpell[1] > 1)) {
            continue;
        }

        // Create a copy of the currentPlayer and the boss
        let newCurrentPlayer = JSON.parse(JSON.stringify(currentPlayer));
        let newBoss = JSON.parse(JSON.stringify(boss));

        playerTurn(newCurrentPlayer, newBoss, spell, mode);
        let newManaSpent = manaSpent + spell.cost;

        if (newCurrentPlayer.HP <= 0) {
            return 'Player died';
        } else if (newBoss.HP <= 0) {
            minimumManaSpent = Math.min(minimumManaSpent, newManaSpent);
            return 'Boss died';
        }

        bossTurn(newCurrentPlayer, newBoss);

        // If the boss is dead, we can stop the game
        if (newBoss.HP <= 0) {
            minimumManaSpent = Math.min(minimumManaSpent, newManaSpent);
            return 'Boss died';
        } else if (newCurrentPlayer.HP <= 0) {
            return 'Player died';
        }

        // If the boss is still alive and the currentPlayer is still alive, we can continue the game
        if (newCurrentPlayer.HP > 0) {
            findCheapestWin(newCurrentPlayer, newBoss, spells, newManaSpent, mode);
        }
    }
}

findCheapestWin(player, boss, spells, 0);
console.log('Part 1 :', minimumManaSpent);

minimumManaSpent = Infinity;
findCheapestWin(player, boss, spells, 0, 'hard');
console.log('Part 2 :', minimumManaSpent);