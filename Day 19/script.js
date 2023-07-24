const fs = require('fs');
const puzzle = fs.readFileSync('./puzzle.txt', 'utf-8').split('\n');
const molecule = puzzle.pop();

// Clean the puzzle because the last line is empty
puzzle.pop();

// Create an array of objects with the elements and their replacements
const elements = puzzle.map((line) => {
    const [element, replacement] = line.split(' => ');
    return { element, replacement };
    }
);

const generateMolecules = (molecule) => {
    // Initialize a set to store all the molecules
    const allMolecules = new Set();

    // For each element, find all the possible replacements and add them to the set
    elements.forEach(({ element, replacement }) => {
        let index = molecule.indexOf(element);
        while (index !== -1) {
            const newMolecule = molecule.slice(0, index) + replacement + molecule.slice(index + element.length);
            allMolecules.add(newMolecule);
            index = molecule.indexOf(element, index + 1);
        }
    });

    return allMolecules;
};

const allMolecules = generateMolecules(molecule);

console.log('Answer 1 :', allMolecules.size);

// Take a molecule and reverse it to 'e', counting the steps
const reverseMolecule = (molecule) => {

    // Inverse the elements and their replacements in order to reverse the molecule
    const reverseElements = elements.map(({ element, replacement }) => ({ element: replacement, replacement: element }));

    let steps = 0;
    let currentMolecule = molecule;

    while (currentMolecule !== 'e') {
        reverseElements.forEach(({ element, replacement }) => {
            if (currentMolecule.includes(element)) {
                currentMolecule = currentMolecule.replace(element, replacement);
                steps++;
            }
        });
    }

    return steps;
}

const steps = reverseMolecule(molecule);

console.log('Answer 2 :', steps);