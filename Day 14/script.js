const fs = require('fs');
const data = fs.readFileSync('puzzle.txt', 'utf8');
puzzle = data.toString();
arrayOfLines = puzzle.split('\n');


let participants = [];

for (let line of arrayOfLines) {
    line = line.split(' ');
    let participant = {
        name: line[0],
        speed: Number(line[3]),
        duration: Number(line[6]),
        rest: Number(line[13]),
    }
    participants.push(participant);
};

const distance = (participant, time) => {

    let cycle = participant.duration + participant.rest;
    let numberOfCycles = Math.floor(time / cycle);
    let distance = numberOfCycles * participant.speed * participant.duration;
    let remainingTime = time % cycle;

    if (remainingTime > participant.duration) {
        distance += participant.speed * participant.duration;
    } else {
        distance += participant.speed * remainingTime;
    }

    return distance;
}

const race = (participants, time) => {

    let maxDistance = 0;
    let bestParticipant = '';

    for (let participant of participants) {
        let distanceOfParticipant = distance(participant, time);
        if (distanceOfParticipant > maxDistance) {
            maxDistance = distanceOfParticipant;
            bestParticipant = participant.name;
        }
    }

    return [maxDistance, bestParticipant];

}

let [winningDistance, winner] = race(participants, 2503);

console.log('Answer 1 : The winner is ' + winner + '  with ' + winningDistance + 'km');

const race2 = (participants, time) => {

    let points = {};

    for (let participant of participants) {
        points[participant.name] = 0;
    }

    for (let i = 1; i <= time; i++) {
        let [maxDistance, bestParticipant] = race(participants, i);
        points[bestParticipant] += 1;
    }

    let maxPoints = 0;
    let winner = '';

    for (let participant in points) {
        if (points[participant] > maxPoints) {
            maxPoints = points[participant];
            winner = participant;
        }
    }

    return [maxPoints, winner];

}

let [winningPoints, winner2] = race2(participants, 2503);

console.log('Answer 2 : The winner is ' + winner2 + '  with ' + winningPoints + ' points');