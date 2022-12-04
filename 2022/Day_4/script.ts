import PuzzleInput from './puzzle_input'

// Part 1
const fullyContains = (arr, target) => target.every(v => arr.includes(v));
const PartOne = () => {
    const firstElvJobs = []
    const secondElvJobs = []
    
    PuzzleInput.forEach((pair) => {
        const firstPairJobs = []
        const secondPairJobs = []
        const [first, second] = pair.split(',')

        const firstRange = first.split('-')
        for(let i = parseInt(firstRange[0]); i <= parseInt(firstRange[1]); i++) firstPairJobs.push(i)
        const secondRange = second.split('-')
        for(let i = parseInt(secondRange[0]); i <= parseInt(secondRange[1]); i++) secondPairJobs.push(i)

        firstElvJobs.push(firstPairJobs)
        secondElvJobs.push(secondPairJobs)
    })

    let overlapingAssignments = 0
    PuzzleInput.forEach((pair, i) => {
        const firstPairJobs = firstElvJobs[i]
        const secondPairJobs = secondElvJobs[i]

        if(fullyContains(firstPairJobs, secondPairJobs) || fullyContains(secondPairJobs, firstPairJobs)) overlapingAssignments++
    })
    console.log(`In total, ${overlapingAssignments} pairs one fully contains the other`)
}
PartOne()

// Part 2
const PartTwo = () => {
    const firstElvJobs = []
    const secondElvJobs = []
    
    PuzzleInput.forEach((pair) => {
        const firstPairJobs = []
        const secondPairJobs = []
        const [first, second] = pair.split(',')

        const firstRange = first.split('-')
        for(let i = parseInt(firstRange[0]); i <= parseInt(firstRange[1]); i++) firstPairJobs.push(i)
        const secondRange = second.split('-')
        for(let i = parseInt(secondRange[0]); i <= parseInt(secondRange[1]); i++) secondPairJobs.push(i)

        firstElvJobs.push(firstPairJobs)
        secondElvJobs.push(secondPairJobs)
    })

    let overlapingAssignments = 0
    PuzzleInput.forEach((pair, i) => {
        const firstPairJobs = firstElvJobs[i]
        const secondPairJobs = secondElvJobs[i]

        if(firstPairJobs.some(v => secondPairJobs.includes(v)) || secondPairJobs.some(v => firstPairJobs.includes(v))) overlapingAssignments++
    })
    console.log(`In ${overlapingAssignments} pairs, at least one job overlaps`)
}
PartTwo()