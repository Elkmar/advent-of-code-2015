const fs = require('fs');
const data = fs.readFileSync('puzzle.txt');
const puzzle = data.toString();
const instructionsInArray = puzzle.split('\n');

const destinations = [];
const routes = {};

for (let instruction of instructionsInArray) {
    parts = instruction.split(' ');
    if (!destinations.includes(parts[0]) ) {
        destinations.push(parts[0]);
    } else if (!destinations.includes(parts[2])) {
        destinations.push(parts[2]);
    }

    routes[parts[0] + 'To' + parts[2]] = Number(parts[4]);
}

const getDistance = (start, end) => {
    for (let route in routes) {
        if (route.includes(start) && route.includes(end)) {
            return (routes[route]);
        }
    }
}

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

let allPossibleRoutes = getPermutations(destinations);

const calculateFullTrajects = (allPossibleRoutes) => {

    for (let route of allPossibleRoutes) {
        let distance = 0;
        for (let i = 0; i < route.length - 1; i++) {
            distance += getDistance(route[i], route[i + 1]);
        }
        route.push(distance);
    }
    return allPossibleRoutes;
}

allPossibleRoutes = calculateFullTrajects(allPossibleRoutes);

const getShortestTraject = (allPossibleRoutes) => {

    let shortestDistance;
    let shortestTraject;

    for (let route of allPossibleRoutes) {
        if (!shortestDistance || route[route.length - 1] < shortestDistance) {
            shortestDistance = route[route.length - 1];
            shortestTraject = route;
        }
    }

    return shortestTraject;
}

const getAnswer1 = () => {
    let shortestTraject = getShortestTraject(allPossibleRoutes);
    console.log('Answer1 : The shortest traject go through ' + shortestTraject[0] + ', ' + shortestTraject[1] + ', ' + shortestTraject[2] + ', ' + shortestTraject[3] + ', ' + shortestTraject[4] + ', ' + shortestTraject[5] + ', ' + shortestTraject[6] + ', ' + shortestTraject[7] + ' and has a distance of ' + shortestTraject[8]);
}

getAnswer1();