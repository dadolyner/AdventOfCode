import PuzzleInput from './data'

// Part 1
const PartOne = () => {
    let onBitCount = 0, offBitCount = 0, gammaRate = '', epsilonRate = ''
    for (let col = 0; col < PuzzleInput[0].length; col++) {
        for (let row = 0; row < PuzzleInput.length; row++) {
            const bit = PuzzleInput[row].charAt(col)
            if (bit === '1') onBitCount++
            else offBitCount++
        }

        if (onBitCount > offBitCount) { gammaRate += '1'; epsilonRate += '0' } 
        else { gammaRate += '0'; epsilonRate += '1' }

        onBitCount = 0
        offBitCount = 0
    }

    const decimalGammaRate = parseInt(gammaRate, 2)
    const decimalEpsilonRate = parseInt(epsilonRate, 2)
    const powerConsumption = decimalGammaRate * decimalEpsilonRate

    return powerConsumption
}
console.log('Power consumption rating: ', PartOne())

// Part 2
const getRating = (type: 'OxygenGenerator' | 'CO2Scrubber') => {
    let PuzzleData: string[] = PuzzleInput

    for (let col = 0; col < PuzzleInput[0].length; col++) {
        let onBitCount = 0, offBitCount = 0
        for (let row = 0; row < PuzzleData.length; row++) {
            const bit = PuzzleData[row].charAt(col)
            if (bit === '1') onBitCount++
            else offBitCount++
        }

        if (type === 'OxygenGenerator') {
            if (onBitCount >= offBitCount) PuzzleData = PuzzleData.filter(bit => bit.charAt(col) === '1')
            else PuzzleData = PuzzleData.filter(bit => bit.charAt(col) === '0')
            if (PuzzleData.length === 1) break
        }

        if (type === 'CO2Scrubber') {
            if (offBitCount <= onBitCount) PuzzleData = PuzzleData.filter(bit => bit.charAt(col) === '0')
            else PuzzleData = PuzzleData.filter(bit => bit.charAt(col) === '1')
            if (PuzzleData.length === 1) break
        }
    }

    const binary = PuzzleData[0]
    const decimal = parseInt(PuzzleData[0], 2)

    return { binary, decimal }
}

const PartTwo = () => {
    const oxygenGeneratorRating = getRating('OxygenGenerator')
    const co2ScrubberRating = getRating('CO2Scrubber')

    const lifeSupportRating = oxygenGeneratorRating.decimal * co2ScrubberRating.decimal
    return lifeSupportRating
}

console.log('Life support rating: ', PartTwo())