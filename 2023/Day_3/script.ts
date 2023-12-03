import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

class DayThree {
    private numbersAdjacentToGears = new Map();
    private readonly input: string[];
    private readonly directions = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: -1 },
        { x: -1, y: 1 },
        { x: 1, y: -1 },
        { x: 1, y: 1 },
    ];

    constructor(input: string[]) {
        this.input = input;
    }

    // Helper function to check if the position is in bounds
    private isPositionInBounds(x: number, y: number, rows: number, cols: number) {
        return (x >= 0) && (x < rows) && (y >= 0) && (y < cols);
    }

    // Helper function to check if the position can be picked
    private canPickPosition(x: number, y: number, grid: string[]) {
        return (grid[x][y] !== ".") && (!/\d/.test(grid[x][y]));
    }

    // Helper function to check if the position is valid
    private isValidPosition(index: number, start: number, end: number, document: string[]) {
        const rows = document.length;
        const cols = document[0].length;

        for (let j = start; j <= end; ++j) {
            for (let d = 0; d < this.directions.length; ++d) {
                const nextX = index + this.directions[d].x;
                const nextY = j + this.directions[d].y;

                if (this.isPositionInBounds(nextX, nextY, rows, cols) && this.canPickPosition(nextX, nextY, document)) {
                    if (document[nextX][nextY] === "*") {
                        const key = nextX * cols + nextY;
                        const value = +document[index].substring(start, end + 1);
                        if (!this.numbersAdjacentToGears.has(key)) this.numbersAdjacentToGears.set(key, []);
                        this.numbersAdjacentToGears.get(key).push(value);
                    }

                    return true;
                }
            }
        }

        return false;
    }

    // Helper function to calculate sum of parts
    private calculateSumOfParts(document: string[]) {
        const rows = document.length;
        const cols = document[0].length;
        let sumOfParts = 0;

        for (let i = 0; i < rows; ++i) {
            let token = "";

            for (let j = 0; j < cols; ++j) {
                if (token && !/\d/.test(document[i][j])) {
                    const start = j - token.length;
                    if (this.isValidPosition(i, start, j - 1, document)) sumOfParts += +token;
                    token = "";
                }

                if (/\d/.test(document[i][j])) token += document[i][j];
            }

            if (token && this.isValidPosition(i, cols - token.length, cols - 1, document)) sumOfParts += +token;
        }

        return sumOfParts;
    }

    // Part 1
    private PartOne(document: string[]) {
        return this.calculateSumOfParts(document);
    }

    // Part 2
    private PartTwo() {
        let sumOfGearRatios = 0;

        for (const [, values] of this.numbersAdjacentToGears) {
            if (values.length === 2) sumOfGearRatios += values[0] * values[1];
        }

        return sumOfGearRatios;
    }

    // Result
    public Result() {
        const partOne = this.PartOne(this.input);
        const partTwo = this.PartTwo();
        console.log("Part 1: ", partOne);
        console.log("Part 2: ", partTwo);
    }
}


const dayThree = new DayThree(PuzzleInput);
dayThree.Result();