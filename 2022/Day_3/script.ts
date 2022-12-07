import PuzzleInput from "./puzzle_input";

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const PartOne = () => {
    let commonItem = []
    let prioritySum = 0
    for (let i = 0; i < PuzzleInput.length; i++) {
        const firstCompartment = PuzzleInput[i].slice(0, PuzzleInput[i].length / 2).split('');
        const secondCompartment = PuzzleInput[i].slice(PuzzleInput[i].length / 2).split('');

        const intersection = firstCompartment.filter(x => secondCompartment.includes(x));
        commonItem.push(intersection)
    }
    commonItem.forEach((item) => prioritySum += alphabet.indexOf(item[0]) + 1)
    console.log('P1 -> Sum of the prioritios for items: ', prioritySum);
}
// PartOne()

const PartTwo = () => {
    let commonItem = []
    let prioritySum = 0
    const groups = []

    for (let i = 0; i < PuzzleInput.length; i += 3) {
        const firstCompartment = PuzzleInput[i].split('');
        const secondCompartment = PuzzleInput[i + 1].split('');
        const thirdCompartment = PuzzleInput[i + 2].split('');

        groups.push([firstCompartment, secondCompartment, thirdCompartment])
    }

    for(let i = 0; i < groups.length; i++) {
        const currentGroup = groups[i]
        // compare all 3 arrays in this group and find common item
        const intersection = currentGroup[0].filter(x => currentGroup[1].includes(x) && currentGroup[2].includes(x));
        commonItem.push(intersection)
    }

    commonItem.forEach((item) => prioritySum += alphabet.indexOf(item[0]) + 1)
    console.log('P2 -> Sum of the prioritios for items of each group: ', prioritySum);

}
PartTwo()