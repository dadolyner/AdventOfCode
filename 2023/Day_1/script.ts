import { PuzzleInput } from "./puzzle_input";

class DayOne {
	input: string[];

	constructor(input: string[]) {
		this.input = input;
	}

	// Helper function to sanitize the document
	private sanitize = (document: string[]): string[] => {
		for (const line in document) {
			document[line] = document[line]
				.replace(/one/g, "xx1xx")
				.replace(/two/g, "xx2xx")
				.replace(/three/g, "xx3xx")
				.replace(/four/g, "xx4xx")
				.replace(/five/g, "xx5xx")
				.replace(/six/g, "xx6xx")
				.replace(/seven/g, "xx7xx")
				.replace(/eight/g, "xx8xx")
				.replace(/nine/g, "xx9xx");
		}
		return document;
	};

	// Helper function to calculate the calibration
	private calculateCalibration = (document: string[]): number => {
		let sum = 0;
		for (const line of document) {
			const firstDigitMatch = line.match(/\d/);
			const lastDigitMatch = line.match(/\d(?=[^\d]*$)/);

			if (firstDigitMatch && lastDigitMatch) {
				const firstDigit = parseInt(firstDigitMatch[0]);
				const lastDigit = parseInt(lastDigitMatch[0]);
				sum += firstDigit * 10 + lastDigit;
			}
		}
		return sum;
	};

	// Part 1
	public PartOne(document: string[]) {
		return this.calculateCalibration(document);
	}

	// Part 2
	public PartTwo(document: string[]) {
		const sanitizedDocument = this.sanitize(document);
		return this.calculateCalibration(sanitizedDocument);
	}
}

const dayOne = new DayOne(PuzzleInput);
console.log("Part 1: ", dayOne.PartOne(dayOne.input));
console.log("Part 2: ", dayOne.PartTwo(dayOne.input));
