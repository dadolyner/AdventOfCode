import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

class Solution {
	private readonly input: string[];
	private sum: number = 0;
	private similarity: number = 0;

	constructor(input: string[]) {
		this.input = input;
	}

	// helper to prepare arrays
	private prepareArrays(document: string[]) {
		const leftSide = [];
		const rightSide = [];
		document.forEach((line: string) => {
			const [left, right] = line.split("   ");
			leftSide.push(parseInt(left));
			rightSide.push(parseInt(right));
		});

		return [leftSide, rightSide];
	}

	// Part 1
	private PartOne(document: string[]) {
		const [leftSide, rightSide] = this.prepareArrays(document);
		const sortedLeft = leftSide.sort((a, b) => a - b);
		const sortedRight = rightSide.sort((a, b) => a - b);

		for (let i = 0; i < sortedLeft.length; i++) {
			const difference = Math.abs(sortedLeft[i] - sortedRight[i]);
			this.sum += difference;
		}

		return this.sum;
	}

	// Part 2
	private PartTwo(document: string[]) {
		const [leftSide, rightSide] = this.prepareArrays(document);
		const rightCounts = {};

		for (const index of rightSide) {
			if (rightCounts[index] === undefined) {
				rightCounts[index] = 0;
			}

			rightCounts[index]++;
		}

		this.similarity = 0;
		for (const index of leftSide) {
			const count = rightCounts[index] ?? 0;
			this.similarity += index * count;
		}

		return this.similarity;
	}

	// Result
	public Result() {
		const partOne = this.PartOne(this.input);
		const partTwo = this.PartTwo(this.input);
		console.log("Part 1: ", partOne);
		console.log("Part 2: ", partTwo);
	}
}

console.time("Day 1 Speed");
const solution = new Solution(PuzzleInput);
solution.Result();
console.timeEnd("Day 1 Speed");
