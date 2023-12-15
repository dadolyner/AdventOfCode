import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

class DayFourteen {
    private input: string[];

    constructor(input: string[]) {
        this.input = this.transposeRow(input);
    }

    private transposeRow(input: string[]): string[] {
        const transposed: string[] = [];

        for (let i = 0; i < input[0].length; i++) {
            let newRow = "";
            for (let j = 0; j < input.length; j++) newRow += input[j][i];
            transposed.push(newRow);
        }

        return transposed;
    }

    private cycle(data: string[]): string[] {
        for (let i = 0; i < 4; i++) data = this.rotate90(data.map(this.rollRow));
        return data;
    }

    private rotate90(data: string[]): string[] {
        const rotated: string[] = [];

        for (let i = data[0].length - 1; i >= 0; i--) {
            let newRow = "";
            for (let j = 0; j < data[0].length; j++) newRow += data[j][i];
            rotated.push(newRow);
        }

        return rotated;
    }

    private rollRow(row: string): string {
        let newRow = "";
        let dotCount = 0;

        for (const rock of row) {
            if (rock === ".") dotCount += 1;
            else if (rock === "O") newRow += "O";
            else {
                newRow += ".".repeat(dotCount) + "#";
                dotCount = 0;
            }
        }

        return newRow + ".".repeat(dotCount);
    }

    private countLoad(data: string[]): number {
        let count = 0;
        for (const line of data) {
            for (let rockIdx = 0; rockIdx < line.length; rockIdx++) {
                const rock = line[rockIdx];
                if (rock === "O") count += line.length - rockIdx;
            }
        }
        return count;
    }

    private PartOne(): number {
        return this.countLoad(this.input.map(this.rollRow));
    }

    private PartTwo(): number {
        const loops: { [key: string]: number } = {};

        for (let idx = 0; idx < 1000000000; idx++) {
            const newData = this.cycle(this.input);
            const newDataStr = newData.join(",");
            
            if (!(newDataStr in loops)) loops[newDataStr] = idx;
            else if ((1000000000 - idx) % (loops[newDataStr] - idx) === 0) break;

            this.input = newData;
        }

        return this.countLoad(this.input);
    }

    public Result() {
        const partOne = this.PartOne();
        const partTwo = this.PartTwo();
        console.log("Part 1:", partOne);
        console.log("Part 2:", partTwo);
    }
}

const dayFourteen = new DayFourteen(PuzzleInput);
dayFourteen.Result();
