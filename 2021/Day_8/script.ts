import PuzzleData from './test_data'

const Segments = { '0': [], '1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': [], '8': [], '9': [] }

const PartOne = () => {
    const uniqueSegments: Array<string> = []
    PuzzleData.forEach((line) => {
        const outputArray = line.split(' | ')[1].split(' ')
        outputArray.forEach((signal) => {
            if (signal.length === 2) uniqueSegments.push(signal) // display 1
            else if(signal.length === 4) uniqueSegments.push(signal) // display 4
            else if(signal.length === 3) uniqueSegments.push(signal) // display 7
            else if(signal.length === 7) uniqueSegments.push(signal) // display 8
            else return
        })
    })
    console.log(uniqueSegments.length)
}
// PartOne()

const PartTwo = () => {
    PuzzleData.forEach((line) => {
        const currentSegment = { a: '', b: '', c: '', d: '', e: '', f: '', g: '' }
        const [signals, output] = line.split(' | ')
        const signalArray = signals.split(' ')
        const outputArray = output.split(' ')

        // Test input of mixed
        // be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb
        
        // Table of propper signals
        // 0 -> abcdef
        // 1 -> ab      has
        // 2 -> abdeg
        // 3 -> abcdg
        // 4 -> bcfg    has
        // 5 -> acdfg
        // 6 -> acdefg
        // 7 -> abc     has
        // 8 -> abcdefg 
        // 9 -> abcdfg
        
        // test
        // be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb

        // expected output: 996280

        signalArray.forEach(signal => {
            if(signal.length === 2) {
                const one = signal.split('')
                currentSegment.c = one[0]
                currentSegment.f = one[1]
            }
            else if(signal.length === 4) {
                const four = signal.split('')
                currentSegment.b = four[0]
                currentSegment.c = four[1]
                currentSegment.d = four[2]
                currentSegment.f = four[3]
            }
            else if(signal.length === 3) {
                const seven = signal.split('')
                currentSegment.a = seven[0]
                currentSegment.c = seven[1]
                currentSegment.f = seven[2]
            }
            else if(signal.length === 7) {
                const eight = signal.split('')
                currentSegment.a = eight[0]
                currentSegment.b = eight[1]
                currentSegment.c = eight[2]
                currentSegment.d = eight[3]
                currentSegment.e = eight[4]
                currentSegment.f = eight[5]
                currentSegment.g = eight[6]
            }
        })

        console.log(currentSegment)
    })


}
PartTwo()