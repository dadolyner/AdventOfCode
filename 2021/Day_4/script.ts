import PuzzleInput from './puzzle_input'

// Types
type TBoards = { boardIndex: number, id: string, board: string[], drawnNum: number, hasWon: boolean }[]

const Boards: TBoards = []
const winners: TBoards = []
class SubmarineBingo {
    lastDrawnNumber: number = 0
    constructor() { }

    // Create unique ID for each board
    private genUuid = async (): Promise<string> => {
        return `xxxxxxxx-xxxx-${4}xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (char) => {
            const randomNumber = Math.random() * 16 | 0
            const uuid = (char === 'x') ? (randomNumber) : (randomNumber & 3 | 8)
            return uuid.toString(16)
        })
    }
    // Generate boards from string input
    public genBingoBoards = async (): Promise<TBoards> => {
        for (let i = 0; i < PuzzleInput.boards.length; i++) {
            Boards.push({
                boardIndex: i + 1,
                id: await this.genUuid(),
                board: PuzzleInput.boards[i].split(" "),
                drawnNum: 0,
                hasWon: false
            })
            const currentBoard = Boards[i].board
            const boardGrid: Array<string> = [] // @ts-ignore
            for (let j = 0; j < 5; j++) boardGrid.push(currentBoard.slice(j * 5, j * 5 + 5))
            Boards[i].board = boardGrid
        }
        return Boards
    }
    // Check if board has a row bingo
    private checkRowBingo = async (board: Array<string>): Promise<boolean | undefined> => {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (!board[row][col].startsWith("(") && !board[row][col].endsWith(")")) return false
                if (col === 4) return true
            }
        }
    }
    // Check if board has a column bingo
    private checkColumnBingo = async (board: Array<string>): Promise<boolean | undefined> => {
        for (let col = 0; col < 5; col++) {
            for (let row = 0; row < 5; row++) {
                if (!board[row][col].startsWith("(") && !board[row][col].endsWith(")")) return false
                if (row === 4) return true
            }
        }
    }
    // Calculate score -> (unchecked numbers * last drawn number)
    public calculateScore = async (board: Array<string>, number: number) => {
        let sumUnmarked = 0
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (!board[row][col].startsWith("(") && !board[row][col].endsWith(")")) sumUnmarked += +board[row][col]
            }
        }
        if (number) return sumUnmarked * number
        return sumUnmarked * this.lastDrawnNumber
    }

    // Draw a number and do some data analysis
    public drawNumber = async (number: number) => {
        for (let board = 0; board < Boards.length; board++) {
            const currentBoard = Boards[board]
            if (currentBoard.hasWon === true) continue
            for (let row = 0; row < 5; row++) {
                for (let col = 0; col < 5; col++) {
                    if (+currentBoard.board[row][col] === number) { //@ts-ignore
                        currentBoard.board[row][col] = `(${currentBoard.board[row][col]})`
                    }
                }
            }
        }
        for (let board = 0; board < Boards.length; board++) {
            const currentBoard = Boards[board]
            if (currentBoard.hasWon === true) continue
            const rowWinner = await this.checkRowBingo(currentBoard.board)
            const colWinner = await this.checkColumnBingo(currentBoard.board)
            if (rowWinner === true || colWinner === true) {
                currentBoard.drawnNum = number
                currentBoard.hasWon = true
                this.lastDrawnNumber = number
                return { boardIndex: board + 1, currentBoard }
            }
        }
    }
}

// Part 1
const PartOne = async () => {
    const game = new SubmarineBingo()
    await game.genBingoBoards()

    for (let i = 0; i < PuzzleInput.numbers.length; i++) {
        const number = PuzzleInput.numbers[i]
        const winner = await game.drawNumber(number)
        if (winner) {
            const score = await game.calculateScore(winner.currentBoard.board, winner.currentBoard.drawnNum)
            console.log(`Board ${winner.boardIndex} won on drawing number ${winner.currentBoard.drawnNum}, with score: ${score}`)
            break
        }
    }
}
// PartOne()

// Part 2
const PartTwo = async () => {
    const game = new SubmarineBingo()
    await game.genBingoBoards()

    for (let i = 0; i < PuzzleInput.numbers.length; i++) {
        const number = PuzzleInput.numbers[i]
        const winner = await game.drawNumber(number)
        if(winner) {
            const winnerExists = winners.find(w => w.id === winner.currentBoard.id)
            if(!winnerExists && winner.currentBoard.hasWon) winners.push(winner.currentBoard)
        }
    }

    const lastWinner = winners[winners.length - 1]
    const score = await game.calculateScore(lastWinner.board, lastWinner.drawnNum)
    console.log(`Board ${lastWinner.boardIndex} won on drawing number ${lastWinner.drawnNum}, with score: ${score}`)
}
PartTwo()