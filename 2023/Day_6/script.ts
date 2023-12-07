import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

class DaySix {
    private input: string[];

    constructor(input: string[]) {
        this.input = input;
    }

    private parseInput() {
        const lines = this.input
            .map((line) => line.split(":").slice(1).map((ele) => ele.trim()))
            .map((ele) => ele[0])
        return lines;
    }

    private calculate(maxTime: number, distance: number) {
        let currentWins = 0;
        for (let j = 0; j <= maxTime; j++) {
            const speed = j;
            const remainingTime = maxTime - j;
            if (speed * remainingTime > distance) currentWins++;
        }
        return currentWins;
    }

    private PartOne() {
        let totalWins = 1;
        const lines = this.parseInput().map((ele) => ele.split(" ").filter((ele) => ele.length > 0).map((ele) => parseInt(ele)))

        for (let i = 0; i < lines[0].length; i++) {
            const maxTime = lines[0][i];
            const distance = lines[1][i];
            const currentWins = this.calculate(maxTime, distance);
            totalWins *= currentWins;
        }

        return totalWins;
    }

    private PartTwo() {
        let totalWins = 1;
        const lines = this.parseInput().map((ele) => ele.split(" ").filter((ele) => ele.length > 0)).map((ele) => parseInt(ele.join("")));

        const maxTime = lines[0];
        const distance = lines[1];
        const currentWins = this.calculate(maxTime, distance);
        totalWins *= currentWins;

        return totalWins;
    }

    public Result() {
        const partOne = this.PartOne();
        const partTwo = this.PartTwo();
        console.log("Part 1: ", partOne);
        console.log("Part 2: ", partTwo);
    }
}
const daySix = new DaySix(PuzzleInput);
daySix.Result();