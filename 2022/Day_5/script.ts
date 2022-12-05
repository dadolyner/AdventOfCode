import { Cargo, Movements } from './puzzle_input'

const PartOne = () => {
    for (let i = 0; i < Movements.length; i++) {
        const [move, from, to] = Movements[i]
        const stackFrom = Cargo[from - 1]
        const stackTo = Cargo[to - 1]
        stackTo.push(...stackFrom.splice(-move).reverse())
    }

    let topOfStack = ''
    for (let i = 0; i < Cargo.length; i++) {
        const stack = Cargo[i]
        topOfStack += stack[stack.length - 1]
    }

    console.log('P1 -> Crates on top', topOfStack)
}
// PartOne()

const PartTwo = () => {
    for (let i = 0; i < Movements.length; i++) {
        const [move, from, to] = Movements[i]
        const stackFrom = Cargo[from - 1]
        const stackTo = Cargo[to - 1]
        stackTo.push(...stackFrom.splice(move * -1))
    }

    let topOfStack = ''
    for (let i = 0; i < Cargo.length; i++) {
        const stack = Cargo[i]
        topOfStack += stack[stack.length - 1]
    }

    console.log('P2 -> crates on top', topOfStack)
}
PartTwo()