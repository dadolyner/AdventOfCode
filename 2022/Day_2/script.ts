import PuzzleInput from "./puzzle_input";

// Rock A       X   ->  1
// Paper B      Y   ->  2
// Scissors C   Z   ->  3
// 0 lost, 3 draw, 6 won

// PartOne
let trueScore: number = 0;
const RockPaperScisors = (opponent: string, me: string) => {
    if (opponent === 'A' && me === 'X') { trueScore += 4 }
    if (opponent === 'A' && me === 'Y') { trueScore += 8 }
    if (opponent === 'A' && me === 'Z') { trueScore += 3 }

    if (opponent === 'B' && me === 'X') { trueScore += 1 }
    if (opponent === 'B' && me === 'Y') { trueScore += 5 }
    if (opponent === 'B' && me === 'Z') { trueScore += 9 }

    if (opponent === 'C' && me === 'X') { trueScore += 7 }
    if (opponent === 'C' && me === 'Y') { trueScore += 2 }
    if (opponent === 'C' && me === 'Z') { trueScore += 6 }
}

const PartOne = () => {
    for(let i = 0; i < PuzzleInput.length; i++) {
        const [opponent, me] = PuzzleInput[i].split(' ');  
        RockPaperScisors(opponent, me); 
    }
    console.log('Total score acording to true strategy: ', trueScore);
}
PartOne()

// PartTwo
let mockedScore: number = 0;
const RockPaperDraw = (opponent: string, me: string) => {
    // Lose
    if(me === 'X') {
        if(opponent === 'A') { mockedScore += 3 }
        if(opponent === 'B') { mockedScore += 1 }
        if(opponent === 'C') { mockedScore += 2 }
    }
    // Draw
    if(me === 'Y') {
        if(opponent === 'A') { mockedScore += 4 }
        if(opponent === 'B') { mockedScore += 5 }
        if(opponent === 'C') { mockedScore += 6 }
    }
    // Win
    if(me === 'Z') {
        if(opponent === 'A') { mockedScore += 8 }
        if(opponent === 'B') { mockedScore += 9 }
        if(opponent === 'C') { mockedScore += 7 }
    }
}

const PartTwo = () => {
    for(let i = 0; i < PuzzleInput.length; i++) {
        const [opponent, me] = PuzzleInput[i].split(' ');
        RockPaperDraw(opponent, me); 
    }
    console.log('Total score acording to mocked strategy: ', mockedScore);
}
PartTwo()