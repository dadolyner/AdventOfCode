import PuzzleInput from './data'

// Part 1
const count_increase = () => {
    let count = 0
    for (let i = 0; i < PuzzleInput.length; i++) {
        if (PuzzleInput[i] > PuzzleInput[i - 1]) count++
    }
    return count
}
console.log("Measurements larger than the previous measurement: ", count_increase())

// Part 2
const count_increase_triplets = () => {
    let count = 0
    let prev_tripplet = 0
    for (let i = 0; i < PuzzleInput.length; i++) {
        const current_tripplet = PuzzleInput[i] + PuzzleInput[i + 1] + PuzzleInput[i + 2]
        if(prev_tripplet !== 0 && current_tripplet > prev_tripplet) count++
        prev_tripplet = current_tripplet
    }
    return count
}
console.log("Measurements larger than the previous measurement with three-measurement sliding window: ", count_increase_triplets())