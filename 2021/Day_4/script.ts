import PuzzleInput from './data'

// Part 1
const Boards: Array<string[]> = []
class SubmarineBingo {
    numberOfBoards: number
    constructor(numberOfBoards :number) {
        this.numberOfBoards = numberOfBoards
    }

    shuffleNumbers = () => {
        const { numbers } = PuzzleInput
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]]
        }
        return numbers
    }

    genBingoBoards = () => {
        for (let i = 0; i < this.numberOfBoards; i++) {
            Boards.push(PuzzleInput.boards[i].split(" "))
            const currentBoard = Boards[i]
            const grid: any = []
            for (let j = 0; j < 5; j++) grid.push(currentBoard.slice(j * 5, j * 5 + 5))
            Boards[i] = grid
        }
        return Boards
    }
}

const game = new SubmarineBingo(3)
const numberDrawOrder = game.shuffleNumbers()
const bingoBoards = game.genBingoBoards()

console.log("Number Draw Order: ", numberDrawOrder)
console.log("Bingo Boards: ", bingoBoards)