import PuzzleInput from './puzzle_input'

type DataObj = { [key: string]: any[] }
const PartOne = () => {
    const data = PuzzleInput
    const dataObj: DataObj = {}
    let currentDir = ''
    data.forEach((line) => {
        if (line.startsWith('$ cd')) currentDir = line.split(' ')[2]
        else if (line.startsWith('dir')) {
            const dir = line.split(' ')[1]
            if (dataObj[currentDir]) dataObj[currentDir].push(dir)
            else dataObj[currentDir] = [dir]
        } else if (line.match(/\d/)) {
            const file = line.split(' ')[0]
            if (dataObj[currentDir]) dataObj[currentDir].push(+file)
            else dataObj[currentDir] = [+file]
        }
    })

    while (Object.values(dataObj).some((item) => item.some((item) => typeof item === 'string'))) {
        for (const [key, value] of Object.entries(dataObj)) {
            if (value.some((item) => typeof item === 'string')) {
                value.forEach((item) => {
                    if (typeof item === 'string') {
                        const index = dataObj[key].indexOf(item)
                        dataObj[key][index] = dataObj[item]
                    }
                })
            }
            dataObj[key] = dataObj[key].flat()
        }
    }

    let totalSize = 0
    for (const [key, value] of Object.entries(dataObj)) {
        if (value.every((item) => item <= 100000)) {
            totalSize += value.reduce((a, b) => a + b, 0)
        }
    }

    console.log(totalSize)
}
PartOne()