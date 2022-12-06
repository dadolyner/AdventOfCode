import PuzzleInput from './puzzle_input'

const hasDuplicates = (arr) => arr.length !== new Set(arr).size;
const PartOne = () => {
    for(let i = 0; i < PuzzleInput.length; i++) {
        if(i < 4) continue
        
        const recent4 = PuzzleInput.slice(i - 4, i)
        const hasDupes = hasDuplicates(recent4)
        if(!hasDupes) {
            console.log('Marker found after character: ', i)
            break
        }
    }
}
PartOne()


const PartTwo = () => {
    for(let i = 0; i < PuzzleInput.length; i++) {
        if(i < 14) continue
        
        const recent4 = PuzzleInput.slice(i - 14, i)
        const hasDupes = hasDuplicates(recent4)
        if(!hasDupes) {
            console.log('Message found after character: ', i)
            break
        }
    }
}
PartTwo()