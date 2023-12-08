import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

class DayEight {
    private input: string[];
    private nodes: Record<string, { L: string; R: string }> = {};
    private instructions: Array<"R" | "L"> = [];

    constructor(input: string[]) {
        this.input = input;
    }

    private prepareInput() {
        for (let i = 1; i < this.input.length; i++) {
            const line = this.input[i];
            this.nodes[line.substring(0, 3)] = {
                L: line.substring(7, 10),
                R: line.substring(12, 15),
            };
        }

        this.instructions = this.input[0].split("") as Array<"R" | "L">;
    }

    private gratestCommonDevisor = (a: number, b: number) => {
        while (b > 0) [a, b] = [b, a % b];
        return a;
    };

    private leastCommonMultiple = (a: number, b: number) =>
        (a * b) / this.gratestCommonDevisor(a, b);

    private PartOne() {
        this.prepareInput();

        let steps = 0;
        let curr = "AAA";

        let i = 0;
        while (curr !== "ZZZ") {
            steps++;
            curr = this.nodes[curr][this.instructions[i]];
            i = i + 1 < this.instructions.length ? i + 1 : 0;
        }

        return steps;
    }

    private PartTwo() {
        const starts = [];
        for (const key in this.nodes) {
            if (
                Object.prototype.hasOwnProperty.call(this.nodes, key) &&
                key[2] === "A"
            ) {
                starts.push(key);
            }
        }

        const lengths = starts.map((start) => {
            let steps = 0;
            let curr = start;
            for (let i = 0; curr[2] !== "Z"; i = (i + 1) % this.instructions.length) {
                steps++;
                curr = this.nodes[curr][this.instructions[i]];
            }
            return steps;
        });

        return lengths.reduce((n, x) => this.leastCommonMultiple(x, n), 1);
    }

    public Result() {
        const partOne = this.PartOne();
        const partTwo = this.PartTwo();
        console.log("Part 1: ", partOne);
        console.log("Part 2: ", partTwo);
    }
}

const dayEight = new DayEight(PuzzleInput);
dayEight.Result();
