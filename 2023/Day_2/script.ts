import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname)

class DayTwo {
    private readonly input: string[];

    constructor(input: string[]) {
        this.input = input;
    }

    // Helper function get data from a line in document
    private useLineData = (line: string) => {
        const [game, sets] = line.split(': ');
        const gameId = +game.match(/(\d+$)/)[0]
        const set = sets.split('; ');
        const possible = true;
        const bagMax = { red: 12, green: 13, blue: 14 };
        const bagMin = { red: 0, green: 0, blue: 0 };
        return { game, sets, gameId, set, possible, bagMin, bagMax }
    }

    // Part 1
    private PartOne(document: string[]) {
        let sumOfIds = 0;

        document.forEach((line: string) => {
            let { gameId, set, possible, bagMax } = this.useLineData(line);

            set.forEach((item: string) => {
                let cubes = item.split(", ");
                cubes.forEach((cube: string) => {
                    let [count, color] = cube.split(' ');
                    if (+count > bagMax[color]) possible = false
                });
            });

            if (possible) sumOfIds += gameId
        });

        return sumOfIds;
    };

    // Part 2
    private PartTwo(document: string[]) {
        let sumOfIds = 0;

        document.forEach((line) => {
            let { set, bagMin } = this.useLineData(line);

            set.forEach((item: string) => {
                let cubes = item.split(", ");
                cubes.forEach((cube: string) => {
                    let [count, color] = cube.split(' ');
                    if (+count > bagMin[color]) bagMin[color] = +count;
                });
            });

            sumOfIds += Object.values(bagMin).reduce((p, n) => p * n, 1);
        });

        return sumOfIds;
    }

    // Result
    public Result() {
        const partOne = this.PartOne(this.input);
        const partTwo = this.PartTwo(this.input);
        console.log("Part 1: ", partOne);
        console.log("Part 2: ", partTwo);
    }
}

const dayTwo = new DayTwo(PuzzleInput);
dayTwo.Result();