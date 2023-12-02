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
				.replace(/one/g, "o1e")
				.replace(/two/g, "t2o")
				.replace(/three/g, "th3ee")
				.replace(/four/g, "fo4ur")
				.replace(/five/g, "fi5ve")
				.replace(/six/g, "s6x")
				.replace(/seven/g, "se7en")
				.replace(/eight/g, "ei8th")
				.replace(/nine/g, "ni9ne");
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
	private PartOne(document: string[]) {
		return this.calculateCalibration(document);
	}

	// Part 2
	private PartTwo(document: string[]) {
		const sanitizedDocument = this.sanitize(document);
		return this.calculateCalibration(sanitizedDocument);
	}

	// Result
	public Result() {
		const partOne = this.PartOne(this.input);
		const partTwo = this.PartTwo(this.input);
		console.log("Part 1: ", partOne);
		console.log("Part 2: ", partTwo);
	}
}

const dayOne = new DayOne(PuzzleInput);
dayOne.Result();
