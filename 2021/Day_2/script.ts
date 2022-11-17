import PuzzleInput from './data'

// Prepare data for calculations
const preparedData = PuzzleInput.map((movement) => {
    const direction = movement.split(" ")[0]
    const units = +movement.split(" ")[1]
    return { direction, units }
})

// Part 1
const moveSubmarine = () => {
    let horizontalPosition = 0, depth = 0

    preparedData.forEach((movement) => {
        const { direction, units } = movement

        switch (direction) {
            case 'forward':
                horizontalPosition += units
                break;

            case 'down':
                depth += units
                break;

            case 'up':
                depth -= units
                break;
        }
    })
    return horizontalPosition * depth
}
console.log("Final horizontal position multiplied by final depth: ", moveSubmarine())

// Part 2
const moveSubmarineWithAim = () => {
    let horizontalPosition = 0, depth = 0, aim = 0

    preparedData.forEach((movement) => {
        const { direction, units } = movement

        switch (direction) {
            case 'forward':
                horizontalPosition += units
                depth += aim * units
                break;

            case 'down':
                aim += units
                break;

            case 'up':
                aim -= units
                break;
        }
    })
    return horizontalPosition * depth
}
console.log("Final horizontal position multiplied by final depth with aim: ", moveSubmarineWithAim())