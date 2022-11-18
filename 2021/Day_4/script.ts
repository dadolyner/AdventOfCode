import PuzzleInput from './data'

// Part 1
const Boards: Array<string[]> = []
const numberOrder = PuzzleInput.numbers
const winningBoards: Array<string> = []
class SubmarineBingo {
    numberOfBoards: number = 0
    lastDrawnNumber: number = 0
    constructor(numberOfBoards: number) {
        this.numberOfBoards = numberOfBoards
    }

    genBingoBoards = () => {
        for (let i = 0; i < this.numberOfBoards; i++) {
            Boards.push(PuzzleInput.boards[i].split(" "))
            const currentBoard = Boards[i]
            const grid: Array<string> = [] //@ts-ignore
            for (let j = 0; j < 5; j++) grid.push(currentBoard.slice(j * 5, j * 5 + 5))
            Boards[i] = grid
        }
        return Boards
    }

    drawNumber = (bingoBoards: Array<Array<string>>, number: number) => {
        console.log(`Drawing number ... ${number}`)
        for (let board = 0; board < this.numberOfBoards; board++) {
            const currentBoard = bingoBoards[board]
            for (let row = 0; row < 5; row++) {
                for (let col = 0; col < 5; col++) {
                    if (+currentBoard[row][col] === number) { //@ts-ignore
                        currentBoard[row][col] = `(${currentBoard[row][col]})`
                    }
                }
            }
            console.log(`Board ${board + 1}:`, currentBoard)
            const winner = this.checkWinner(currentBoard)
            if (winner) {
                this.lastDrawnNumber = number
                return { currentBoard, message: `Board ${board + 1} wins!` }
            }
        }
    }

    checkWinner = (board: Array<string>) => {
        for (let row = 0; row < 5; row++) { //@ts-ignore
            if (board[row].every((num) => num.startsWith("(") && num.endsWith(")"))) return true
        }

        for (let col = 0; col < 5; col++) {
            for (let row = 0; row < 5; row++) {
                if (!board[row][col].startsWith("(") || !board[row][col].endsWith(")")) break
                if (row === 4) return true
            }
        }
    }

    calculateScore = (board: Array<string>) => {
        let sumUnmarked = 0
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (!board[row][col].startsWith("(") && !board[row][col].endsWith(")")) sumUnmarked += +board[row][col]
            }
        }
        return sumUnmarked * this.lastDrawnNumber
    }
}

const PartOne = () => {
    const boardCount = PuzzleInput.boards.length
    const game = new SubmarineBingo(boardCount)
    const bingoBoards = game.genBingoBoards()

    for (let i = 0; i < numberOrder.length; i++) {
        const number = numberOrder[i]
        const winner = game.drawNumber(bingoBoards, number)
        if (winner) {
            console.log(winner.message)
            const score = game.calculateScore(winner.currentBoard)
            console.log("Score: ", score)
            break
        }
    }
}
PartOne()