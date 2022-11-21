import PuzzleInput from './puzzle_input';

const PartOne = () => {
    let floor = 0
    const directions = PuzzleInput.split('')
    directions.forEach((direction) => {
        if (direction === '(') floor += 1
        else if (direction === ')') floor -= 1
    })
    console.log('Floor: ', floor)
}
PartOne()

const PartTwo = () => {
    let floor = 0
    const directions = PuzzleInput.split('')
    for(let i = 0; i< directions.length; i++) {
        if (directions[i] === '(') floor += 1
        else if (directions[i] === ')') floor -= 1
        if (floor < 0) {
            console.log('Basement entered at position: ', i + 1)
            break
        }
    }
}
PartTwo()