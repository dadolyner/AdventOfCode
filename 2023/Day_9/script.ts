import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

class DayNine {
    private input: string[];
    private xValues: number[];
    private yValues: number[][];
    private n: number;

    constructor(input: string[]) {
        this.input = input;
        this.prepareInput()
    }

    private prepareInput() {
        this.yValues = this.input.map((line) => line.split(" ").map((value) => +value))
        this.n = this.yValues[0].length;
        this.xValues = new Array(this.n).fill(0).map((_, i) => i);
    }

    private lagrangeInterpolation (x: number, xValues: number[], yValues: number[]) {
        let  interpolatedValue = 0;
        for (let i = 0; i < xValues.length; i++) {
            let basisPolynomial = 1;
            for (let j = 0; j < xValues.length; j++) {
                if (i !== j) {
                    basisPolynomial *= (x - xValues[j]) / (xValues[i] - xValues[j]);
                }
            }
            interpolatedValue += basisPolynomial * yValues[i];
        }
        return  interpolatedValue;
    };

    private PartOne() {
        const nextLagranged = this.yValues.map((values) => this.lagrangeInterpolation(this.n, this.xValues, values));
        const result = nextLagranged.reduce((acc, value) => acc + value, 0);
        return Math.round(result);
    }

    private PartTwo() {
        const previousLagranged = this.yValues.map((values) => this.lagrangeInterpolation(-1, this.xValues, values));
        const result = previousLagranged.reduce((acc, value) => acc + value, 0);
        return Math.round(result);
    }

    public Result() {
        const partOne = this.PartOne();
        const partTwo = this.PartTwo();
        console.log("Part 1: ", partOne);
        console.log("Part 2: ", partTwo);
    }
}

const dayNine = new DayNine(PuzzleInput);
dayNine.Result();