import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

class DayFour {
    private readonly input: string[];
    private totalPoints: number = 0;
    private cards: number[] = Array(PuzzleInput.length).fill(1);

    constructor(input: string[]) {
        this.input = input;
        this.calculateResult();
    }

    private useLineData(line: string) {
        const [_, numbers] = line.split(":");
        const [winningNumbers, myNumbers] = numbers.split("|").map((value) => value.split(" ").filter(Boolean));
        const uniqueNumbers = [...new Set(winningNumbers.filter((value: string) => myNumbers.includes(value)))]

        return uniqueNumbers.length;
    }

    private calculateResult() {
        for (let index = 0; index < this.input.length; index++) {
            const numbersLength = this.useLineData(this.input[index]);

            if (numbersLength > 0) {
                this.totalPoints += (2 ** (numbersLength - 1))
            };

            for (let i = 0; i < numbersLength; i++) {
                this.cards[index + i + 1] += this.cards[index];
            }
        }
    }

    private PartOne(): number {
        return this.totalPoints;
    }

    private PartTwo(): number {
        return this.cards.reduce((acc, value) => acc + value, 0);
    }

    public Result() {
        const partOne = this.PartOne();
        const partTwo = this.PartTwo();
        console.log("Part 1: ", partOne);
        console.log("Part 2: ", partTwo);
    }
}

const dayFour = new DayFour(PuzzleInput);
dayFour.Result();