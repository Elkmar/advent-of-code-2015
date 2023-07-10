const fs = require('fs');
const data = fs.readFileSync('puzzle.txt');
const puzzle = data.toString();
const instructionsInArray = puzzle.split('\n');

const guests = [];
const guestArrangements = {};

// Build an array of the guests 
for (let instruction of instructionsInArray) {
    parts = instruction.split(' ');
    if (!guests.includes(parts[0]) ) {
        guests.push(parts[0]);
    }
}



// Build a full list of the guest arrangements possible
const getAllPossibleGuestArrangements = (guests) => {

    const getPermutations = (array) => {

        if (array.length === 0) return [[]];

        let permutations = [];

        for (let i = 0; i < array.length; i++) {

            let rest = getPermutations(array.slice(0, i).concat(array.slice(i + 1)));

            for(let j = 0; j < rest.length; j++) {
                permutations.push([array[i]].concat(rest[j]));
            }

        }

        return permutations;  

    }

    let allPossibleGuestArrangements = getPermutations(guests);

    return allPossibleGuestArrangements;

}

let allPossibleGuestArrangements = getAllPossibleGuestArrangements(guests);

// Get the happiness guest 1 gets from sitting next to guest 2
const getHappiness = (guest1, guest2) => {
    for (let instruction of instructionsInArray) {
        parts = instruction.split(' ');
        if (parts[0] === guest1 && parts[10].includes(guest2)) {
            return (Number(parts[3]) * (parts[2] === 'gain' ? 1 : -1));
        }
    }
}

const getHighestHappiness = (guestArrangements) => {

    // Get the happiness of a guest arrangement
    const calculateHappiness = (guestArrangement) => {

        let happiness = 0;

        for (let guest of guestArrangement) {
            let nextGuest = guestArrangement[guestArrangement.indexOf(guest) + 1] || guestArrangement[0];
            happiness += getHappiness(guest, nextGuest);
            happiness += getHappiness(nextGuest, guest);
        }

        return happiness;

    }

    let highestHappiness = 0;
    let bestGuestArrangement = [];

    for (let guestArrangement of guestArrangements) {

        let happiness = calculateHappiness(guestArrangement);

        if (happiness > highestHappiness) {
            highestHappiness = happiness;
            bestGuestArrangement = guestArrangement;
        }

    }

    return [highestHappiness, bestGuestArrangement];

}

[highestHappiness, bestGuestArrangement] = getHighestHappiness(allPossibleGuestArrangements);

console.log('Answer 1 is : ', highestHappiness, ' and the arrangement is : ', bestGuestArrangement);

const guestAndMe = guests.concat('Me');

allPossibleGuestArrangements = getAllPossibleGuestArrangements(guestAndMe);



const getHighestHappinessWithMe = (guestArrangements) => {

    const getHappinessWithMe = (guest1, guest2) => {

        if (guest1 === 'Me' || guest2 === 'Me') {
            return 0;
        } else {
            return getHappiness(guest1, guest2);
        }
    
    }

    const calculateHappinessWithMe = (guestArrangement) => {

        let happiness = 0;
    
        for (let guest of guestArrangement) {
            let nextGuest = guestArrangement[guestArrangement.indexOf(guest) + 1] || guestArrangement[0];
            happiness += getHappinessWithMe(guest, nextGuest);
            happiness += getHappinessWithMe(nextGuest, guest);
        }
    
        return happiness;
    
    }

    let highestHappiness = 0;
    let bestGuestArrangement = [];

    for (let guestArrangement of guestArrangements) {

        let happiness = calculateHappinessWithMe(guestArrangement);

        if (happiness > highestHappiness) {
            highestHappiness = happiness;
            bestGuestArrangement = guestArrangement;
        }

    }

    return [highestHappiness, bestGuestArrangement];

}

[highestHappiness, bestGuestArrangement] = getHighestHappinessWithMe(allPossibleGuestArrangements);

console.log('Answer 2 is : ', highestHappiness, ' and the arrangement is : ', bestGuestArrangement);

