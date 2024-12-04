import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

class Solution {
	private readonly input: string[];

	constructor(input: string[]) {
		this.input = input;
	}

	private isDecreasingCorrectly(line: number[]) {
		for (let i = 0; i < line.length - 1; i++) {
			const diff = line[i] - line[i + 1];
			if (diff <= 0 || diff >= 4) {
				return false;
			}
		}

		return true;
	}

	private isIncreasingCorrectly(line: number[]) {
		return this.isDecreasingCorrectly(line.reverse());
	}

	private isRowSafe(line: number[]) {
		return this.isDecreasingCorrectly(line) || this.isIncreasingCorrectly(line);
	}

	private getRowPermutations(line: number[]) {
		return line.map((_, index: number) => [
			...line.slice(0, index),
			...line.slice(index + 1)
		]);
	}

	// Part 1
	private PartOne(document: string[]) {
		const formattedInput = document.filter((line) => {
			const row = line.split(" ").map(Number);
			return this.isRowSafe(row);
		});

		return formattedInput.length;
	}

	// Part 2
	private PartTwo(document: string[]) {
		const formattedInput = document.map((line) => line.split(" ").map(Number));

		return formattedInput.filter(
			(row) => this.isRowSafe(row) || this.getRowPermutations(row).some(this.isRowSafe.bind(this))
		).length;
	}

	// Result
	public Result() {
		const partOne = this.PartOne(this.input);
		const partTwo = this.PartTwo(this.input);
		console.log("Part 1: ", partOne);
		console.log("Part 2: ", partTwo);
	}
}

console.time("Day 2 Speed");
const solution = new Solution(PuzzleInput);
solution.Result();
console.timeEnd("Day 2 Speed");
