import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

class DayThirteen {
    private input: string[];
    private totalPerfectScore: number
    private totalImperfectScore: number

    constructor(input: string[]) {
        this.input = input.join('\n').split('\n\n');
        this.totalPerfectScore = 0;
        this.totalImperfectScore = 0;
        this.calculateScore();
    }

    transposeGrid(grid: string[]): string[] {
        return grid[0].split('').map((_, i) => grid.map(row => row[i])).map(row => row.join(''));
    }

    differencesInLines(lineA: string, lineB: string): number {
        return Array.from(lineA).reduce((diff, charA, index) => (charA !== lineB[index] ? diff + 1 : diff), 0);
    }

    differencesBetweenGrids(gridA: string[], gridB: string[]): number {
        return gridA.reduce((diff, lineA, index) => diff + this.differencesInLines(lineA, gridB[index]), 0);
    }

    findReflections(grid: string[]): [number, number] {
        const height = grid.length;
        let perfectSize = 0;
        let imperfectSize = 0;

        for (let size = 1; size <= Math.floor(height / 2); size++) {
            let topSection = grid.slice(0, size);
            let bottomSection = grid.slice(size, 2 * size).slice().reverse(); // Create a reversed copy
            let diff = this.differencesBetweenGrids(topSection, bottomSection);

            if (diff === 0) perfectSize = size;
            else if (diff === 1) imperfectSize = size;

            if (perfectSize && imperfectSize) break;

            topSection = grid.slice(height - 2 * size, height - size);
            bottomSection = grid.slice(height - size).slice().reverse(); // Create a reversed copy
            diff = this.differencesBetweenGrids(topSection, bottomSection);

            if (diff === 0) perfectSize = height - size;
            else if (diff === 1) imperfectSize = height - size;

            if (perfectSize && imperfectSize) break;
        }

        return [perfectSize, imperfectSize];
    }

    calculateScore() {
        for (const gridSection of this.input) {
            const lines = gridSection.split('\n');

            const [perfect, imperfect] = this.findReflections(lines);
            this.totalPerfectScore += 100 * perfect;
            this.totalImperfectScore += 100 * imperfect;

            const [transposedPerfect, transposedImperfect] = this.findReflections(this.transposeGrid(lines));
            this.totalPerfectScore += transposedPerfect;
            this.totalImperfectScore += transposedImperfect;
        }
    }

    private PartOne() {
        return this.totalPerfectScore;
    }

    private PartTwo() {
        return this.totalImperfectScore;
    }

    public Result() {
        const partOne = this.PartOne();
        const partTwo = this.PartTwo();
        console.log("Part 1:", partOne);
        console.log("Part 2:", partTwo);
    }
}

const dayThirteen = new DayThirteen(PuzzleInput);
dayThirteen.Result();