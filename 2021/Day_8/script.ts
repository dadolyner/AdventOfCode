import PuzzleData from './puzzle_input'

// Part 1
const PartOne = () => {
    const uniqueSegments: Array<string> = []
    const data = PuzzleData.split('\n')
    data.forEach((line) => {
        const outputArray = line.split(' | ')[1].split(' ')
        outputArray.forEach((signal) => {
            if (signal.length === 2) uniqueSegments.push(signal) // display 1
            else if (signal.length === 4) uniqueSegments.push(signal) // display 4
            else if (signal.length === 3) uniqueSegments.push(signal) // display 7
            else if (signal.length === 7) uniqueSegments.push(signal) // display 8
            else return
        })
    })
    console.log(`In output values, 1, 4, 7, or 8 appear: ${uniqueSegments.length} times`)
}
PartOne()

// Part 2
interface PuzzleLine { inputs: string[]; outputs: string[]; }

const [lengthOf1, lengthOf4, lengthOf7, lengthOf8] = [2, 4, 3, 7]
const PuzzleInput: PuzzleLine[] = PuzzleData.split("\n").map(line => {
    const inputs: string[] = line.split(" | ")[0].split(" ").map(unsortedStr => { return [...unsortedStr].sort().join('') })
    const outputs: string[] = line.split(" | ")[1].split(" ").map(unsortedStr => { return [...unsortedStr].sort().join('') })
    return { inputs: inputs, outputs: outputs }
})
class SevenSegment {
    private getCommonEdges = (a: string, b: string): number => {
        let commonEdgesCount = 0
        for (let char of a) if (b.includes(char)) commonEdgesCount++
        return commonEdgesCount
    }

    private getDigit = (input: string, digit1: string, digit4: string, digit8: string): number => {
        if (input.length === 6) {
            if (this.getCommonEdges(digit1, input) === 2 && this.getCommonEdges(digit4, input) === 3 && this.getCommonEdges(digit8, input) === 6) { return 0 }
            if (this.getCommonEdges(digit1, input) === 1 && this.getCommonEdges(digit4, input) === 3 && this.getCommonEdges(digit8, input) === 6) { return 6 }
            if (this.getCommonEdges(digit1, input) === 2 && this.getCommonEdges(digit4, input) === 4 && this.getCommonEdges(digit8, input) === 6) { return 9 }
        }
        if (input.length === 5) {
            if (this.getCommonEdges(digit1, input) === 1 && this.getCommonEdges(digit4, input) === 2 && this.getCommonEdges(digit8, input) === 5) { return 2 }
            if (this.getCommonEdges(digit1, input) === 2 && this.getCommonEdges(digit4, input) === 3 && this.getCommonEdges(digit8, input) === 5) { return 3 }
            if (this.getCommonEdges(digit1, input) === 1 && this.getCommonEdges(digit4, input) === 3 && this.getCommonEdges(digit8, input) === 5) { return 5 }
        }
        return -1
    }

    getOutput = (puzzleLine: PuzzleLine): number => {
        const outputMap = new Map<string, number>()
        const charsOf1 = puzzleLine.inputs.filter(input => input.length == lengthOf1)[0]
        const charsOf4 = puzzleLine.inputs.filter(input => input.length == lengthOf4)[0]
        const charsOf7 = puzzleLine.inputs.filter(input => input.length == lengthOf7)[0]
        const charsOf8 = puzzleLine.inputs.filter(input => input.length == lengthOf8)[0]

        outputMap.set(charsOf1, 1)
        outputMap.set(charsOf4, 4)
        outputMap.set(charsOf7, 7)
        outputMap.set(charsOf8, 8)

        let forDeletion = [charsOf1, charsOf4, charsOf7, charsOf8]
        const remainingDigits = puzzleLine.inputs.filter(item => !forDeletion.includes(item))

        for (const digit of remainingDigits) outputMap.set(digit, this.getDigit(digit, charsOf1, charsOf4, charsOf8))

        let outputStr = ""
        for (let outputDigit of puzzleLine.outputs) outputStr = `${outputStr}${outputMap.get(outputDigit)}`

        return +outputStr
    }
}

const PartTwo = () => {
    const sevenSegment = new SevenSegment()
    let output = 0
    for (const puzzleLine of PuzzleInput) {
        output += sevenSegment.getOutput(puzzleLine)
    }
    console.log('Sum of all outputed values is:', output)
}
PartTwo()