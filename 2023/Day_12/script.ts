import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

class DayTwelve {
    private input: string[]
    private memoTable: { [key: string]: number } = {};

    constructor(input: string[]) {
        this.input = input;
    }

    private validConfigurations(dots: string[], blocks: number[], dotIndex: number, blockIndex: number, currentBlockLength: number){
        const key: string = `${dotIndex},${blockIndex},${currentBlockLength}`;
        if (key in this.memoTable) return this.memoTable[key];
        
        if (dotIndex === dots.length) {
            if (blockIndex === blocks.length && currentBlockLength === 0) return 1;
            else if (blockIndex === blocks.length - 1 && blocks[blockIndex] === currentBlockLength) return 1;
            else return 0;
        }

        let configurations = 0;
        
        for (const dotType of ['.', '#']) {
            if (dots[dotIndex] === dotType || dots[dotIndex] === '?') {
                if (dotType === '.' && currentBlockLength === 0) configurations += this.validConfigurations(dots, blocks, dotIndex + 1, blockIndex, 0);
                else if (dotType === '.' && currentBlockLength > 0 && blockIndex < blocks.length && blocks[blockIndex] === currentBlockLength) configurations += this.validConfigurations(dots, blocks, dotIndex + 1, blockIndex + 1, 0);
                else if (dotType === '#') configurations += this.validConfigurations(dots, blocks, dotIndex + 1, blockIndex, currentBlockLength + 1);
            }
        }
        
        this.memoTable[key] = configurations;
        return configurations;
    }

    private PartOne() {
        let totalConfigurations = 0;
        
        for (const line of this.input) {
            let [dots, blocks] = line.split(' ');
            this.memoTable = {};
            const configurations = this.validConfigurations([...dots], blocks.split(',').map(block => parseInt(block, 10)), 0, 0, 0);
            totalConfigurations += configurations;
        }
        
        return totalConfigurations;
    }

    private PartTwo() {
        let totalConfigurations = 0;
        
        for (const line of this.input) {
            let [dots, blocks] = line.split(' ');
            dots = `${dots}?${dots}?${dots}?${dots}?${dots}`;
            blocks = `${blocks},${blocks},${blocks},${blocks},${blocks}`;
            
            this.memoTable = {};
            const configurations = this.validConfigurations([...dots], blocks.split(',').map(block => parseInt(block, 10)), 0, 0, 0);
            totalConfigurations += configurations;
        }
        
        return totalConfigurations;
    }

    public Result(){
        const partOne = this.PartOne();
        const partTwo = this.PartTwo();
        console.log('Part 1:', partOne);
        console.log('Part 2:', partTwo);
    }
}

const dayTwelve = new DayTwelve(PuzzleInput);
dayTwelve.Result();