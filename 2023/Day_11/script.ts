import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

class DayEleven {
    private input: string[];
    private galaxies: number[][] = []
    private emptyRows: number[] = [];
    private emptyCols: number[] = [];

    constructor(input: string[]) {
        this.input = input;
        this.getGalaxies();
    }

    private getGalaxies() {
        for (let row = 0; row < this.input.length; row++) {
            for (let col = 0; col < this.input[row].length; col++) {
                if (this.input[row][col] === '#') this.galaxies.push([row, col]);
            }
        }

        const [rows, cols] = this.galaxies.reduce(([rows, cols], [row, col]) => {
            rows.push(row);
            cols.push(col);
            return [rows, cols];
        }, [[], []]);

        this.emptyRows = Array.from({ length: Math.max(...rows) + 1 }, (_, i) => i).filter(row => !rows.includes(row));
        this.emptyCols = Array.from({ length: Math.max(...cols) + 1 }, (_, i) => i).filter(col => !cols.includes(col));
    }

    private expandGalaxies(a: number, b: number, empty: number[]) {
        return [...Array(Math.max(a, b) - Math.min(a, b) + 1).keys()].filter(value => empty.includes(Math.min(a, b) + value)).length;
    }

    private calculateDistance(expansionSize: number) {
        let distance = 0;

        for (let i = 0; i < this.galaxies.length - 1; i++) {
            for (let j = i + 1; j < this.galaxies.length; j++) {
                const [rowA, colA] = this.galaxies[i];
                const [rowB, colB] = this.galaxies[j];

                const rowExpansions = this.expandGalaxies(rowA, rowB, this.emptyRows);
                distance += Math.abs(rowA - rowB) + (rowExpansions * expansionSize - rowExpansions);

                const colExpansions = this.expandGalaxies(colA, colB, this.emptyCols);
                distance += Math.abs(colA - colB) + (colExpansions * expansionSize - colExpansions);
            }
        }

        return distance;
    }

    private PartOne() {
        return this.calculateDistance(1);
    }

    private PartTwo() {
        return this.calculateDistance(1000000);
    }

    public Result() {
        const partOne = this.PartOne();
        const partTwo = this.PartTwo();
        console.log("Part 1: ", partOne);
        console.log("Part 2: ", partTwo);
    }
}

const dayEleven = new DayEleven(PuzzleInput);
dayEleven.Result();