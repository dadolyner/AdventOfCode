export const usePuzzleInput = (dirname: string) => {
    //@ts-ignore
    const fs = require('fs');
    //@ts-ignore
    const path = require('path');
    //@ts-ignore
    const PuzzleInput = fs.readFileSync(path.join(dirname, './puzzle_input.txt'), 'utf8').split('\n');
    PuzzleInput.forEach((line: string, index: number) => PuzzleInput[index] = line.replace('\r', ''));

    return PuzzleInput;
}