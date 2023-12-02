import { PuzzleInput } from "./puzzle_input";
import { Example } from "./test_data";

const PartOne = (document: string[]) => {
    let sumOfIds = 0;
    const Bag = { red: 12, green: 13, blue: 14 };

    document.forEach((line) => {
        let [game, sets] = line.split(': ');
        let gameId = +game.match(/(\d+$)/)[0]
        let set = sets.split('; ');
        let possible = true;

        set.forEach((item) => {
            let cubes = item.split(", ");
            cubes.forEach(function (cube) {
                let [count, color] = cube.split(' ');
                if (+count > Bag[color]) possible = false
            });
        });

        if (possible) sumOfIds += gameId
    });

    return sumOfIds;
};

const PartTwo = (document: string[]) => {
    let sumOfIds = 0;

    document.forEach((line) => {
        let [, sets] = line.split(': ');
        let set = sets.split('; ');
        let bagMin = { red: 0, green: 0, blue: 0 };

        set.forEach((item) => {
            let cubes = item.split(", ");
            cubes.forEach(function (cube) {
                let [count, color] = cube.split(' ');
                if (+count > bagMin[color]) bagMin[color] = +count;
            });
        });

        sumOfIds += Object.values(bagMin).reduce((p, n) => p * n, 1);
    });

    return sumOfIds;
}

console.log("Part 1: ", PartOne(PuzzleInput));
console.log("Part 2: ", PartTwo(PuzzleInput));