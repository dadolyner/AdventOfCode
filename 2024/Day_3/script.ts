import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

class Solution {
	private readonly input: string[];

	constructor(input: string[]) {
		this.input = input;
	}

	// Part 1
	private PartOne(document: string[]) {
		const pattern = /mul\(\d{1,3},\d{1,3}\)/g
		const matches = document.flatMap(line => line.match(pattern))

		return matches
			.map(match => {
				const [x, y] = match
					.replace('mul(', '')
					.replace(')', '')
					.split(',')
					.map(Number)

				return x * y
			})
			.reduce((acc: number, curr: number) => acc + curr, 0)
	}

	// Part 2
	private PartTwo(document: string[]) {
		const pattern = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g
		const matches = document.flatMap(line => line.match(pattern))
		const keepers: string[] = [];

		let keeping = true
		for (const match of matches) {
			if (match === 'do()') {
				keeping = true;
				continue;
			}

			if (match === "don't()") {
				keeping = false;
				continue;
			}

			if (keeping) {
				keepers.push(match);
			}
		}

		return keepers
			.map(match => {
				const [x, y] = match
					.replace('mul(', '')
					.replace(')', '')
					.split(',')
					.map(Number)

				return x * y
			})
			.reduce((acc: number, curr: number) => acc + curr, 0)
	}

	// Result
	public Result() {
		const partOne = this.PartOne(this.input);
		const partTwo = this.PartTwo(this.input);
		console.log("Part 1: ", partOne);
		console.log("Part 2: ", partTwo);
	}
}

console.time("Day 3 Speed");
const solution = new Solution(PuzzleInput);
solution.Result();
console.timeEnd("Day 3 Speed");
