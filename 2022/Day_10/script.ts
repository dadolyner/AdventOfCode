import PuzzleInput from "./puzzle_input";

let x = 1;
const simulationLength = 240;
let inProgress: number | null = null;
let commandLines = 0;
let position = 0;
let message = "";
let totalSignalStrength = 0;

const PartOne = () => {
    for (let i = 1; i <= simulationLength; ++i) {
        if (i % 40 === 20) totalSignalStrength += i * x;

        if (inProgress !== null) {
            x += inProgress;
            inProgress = null;
        } else {
            const [command, arg] = PuzzleInput[commandLines++].split(" ");
            if (command === "addx") inProgress = +arg;
        }
    }
    console.log(`Part 1: ${totalSignalStrength}`);
}
PartOne()

const PartTwo = () => {
    for (let i = 1; i <= simulationLength; ++i) {
        if (Math.abs(position - x) <= 1) message += "#";
        else message += ".";
        if (++position > 39) {
            message += "\n";
            position = 0;
        }

        if (inProgress !== null) {
            x += inProgress;
            inProgress = null;
        } else {
            const [command, arg] = PuzzleInput[commandLines++].split(" ");
            if (command === "addx") inProgress = +arg;
        }
    }
    console.log(`Part 2: \n${message}`);
}
PartTwo()