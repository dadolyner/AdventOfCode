import PuzzleInput from './test_data'

const PartOne = () => {
    const FileSystem = {}
    const puzzleData = PuzzleInput
    const filteredData = puzzleData.filter(pi => !pi.includes('$ ls'))
    
    let parentDirectory = '', currentDirectory = ''
    for (let i = 0; i < filteredData.length; i++) {
        if(filteredData[i].includes('$ cd')) {
            const Directory = filteredData[i].split(' ')[2]
            if(Directory === '..') {
                currentDirectory = parentDirectory
                continue
            }
            currentDirectory = Directory
            Object.assign(FileSystem, {[currentDirectory]: []})
        }

        if(!isNaN(parseInt(filteredData[i][0]))) {
            const FileSize = filteredData[i].split(' ')[0]
            const FileName = filteredData[i].split(' ')[1]
            const File = {
                Name: FileName,
                Size: +FileSize,
            }
            FileSystem[currentDirectory].push(File)
        }

    }

    console.log(FileSystem)
}
PartOne()