import PuzzleInput from './puzzle_input'

// PartOne
const PartOne = () => {
    const elvesCalories = []
    let sumCalories = 0
    
    for(let i = 0; i < PuzzleInput.length; i++) {
        if(PuzzleInput[i] === '') {
            elvesCalories.push(sumCalories)
            sumCalories = 0
        } else {
            sumCalories += parseInt(PuzzleInput[i])
        }
    }

    const maxCalories = Math.max(...elvesCalories)
    console.log(`Top Elv is carrying: ${maxCalories} calories`)
}
PartOne()

// PartTwo
const PartTwo = () => {
    const elvesCalories = []
    let sumCalories = 0
    
    for(let i = 0; i < PuzzleInput.length; i++) {
        if(PuzzleInput[i] === '') {
            elvesCalories.push(sumCalories)
            sumCalories = 0
        } else {
            sumCalories += parseInt(PuzzleInput[i])
        }
    }

    const topThree = elvesCalories.sort((a, b) => b - a).slice(0, 3)
    const sumTopThree = topThree.reduce((a, b) => a + b, 0)
    console.log(`Top three Elves are carrying: ${sumTopThree} calories`)
}
PartTwo()