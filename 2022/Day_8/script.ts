import PuzzleInput from './puzzle_input'

const PartOne = () => {
    const grid: any = PuzzleInput.map((row) => row.split(''))
    const rowLength = grid.length
    const colLength = grid[0].length
    
    let result = 0
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < colLength; j++) {
            const element = grid[i][j] 
            if (j === 0 || Math.max(...grid[i].slice(0, j)) < element) result += 1 
            else if (j === colLength - 1 || Math.max(...grid[i].slice(j + 1)) < element) result += 1 
            else if (i === 0 || Math.max(...grid.slice(0, i).map((row) => row[j])) < element) result += 1 
            else if (i === rowLength - 1 || Math.max(...grid.slice(i + 1).map((row) => row[j])) < element) result += 1 
        }
    }
    console.log(`${result} trees visible outside grid.`)
}
PartOne()


const PartTwo = () => {
    const grid: any = PuzzleInput.map((row) => row.split(''))
    const rowLength = grid.length
    const colLength = grid[0].length
    
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

    let result = 0
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < colLength; j++) {
            const element = grid[i][j] 
            let score = 1
            for (let k = 0; k < directions.length; k++) {
                let dirX = i + directions[k][0]
                let dirY = j + directions[k][1]
                let distance = 0
                while (0 <= dirX && dirX < rowLength && 0 <= dirY && dirY < colLength && grid[dirX][dirY] < element) {
                    distance += 1
                    dirX += directions[k][0]
                    dirY += directions[k][1]
                    if (0 <= dirX && dirX < rowLength && 0 <= dirY && dirY < colLength && grid[dirX][dirY] >= element) distance += 1
                }
                score *= distance
            }
            result = Math.max(result, score)
        }
    }
    console.log(`Highest possible scenic score is: ${result}`)
}
PartTwo()