import PuzzleInput from './data'

// Part 1
const PartOne = () => {
    let count = 0
    PuzzleInput.forEach((input, i) => PuzzleInput[i] > PuzzleInput[i - 1] ? count++ : null)
    return count
}
console.log("Measurements larger than the previous measurement: ", PartOne())

// Part 2
const PartTwo = () => {
    let count = 0, prev_tripplet = 0
    PuzzleInput.forEach((input, i) => {
        const current_tripplet = PuzzleInput[i] + PuzzleInput[i + 1] + PuzzleInput[i + 2]
        if(prev_tripplet !== 0 && current_tripplet > prev_tripplet) count++
        prev_tripplet = current_tripplet
    })
    return count
}
console.log("Measurements larger than the previous measurement with three-measurement sliding window: ", PartTwo())