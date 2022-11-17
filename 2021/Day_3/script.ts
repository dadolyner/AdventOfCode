import PuzzleInput from './data'

// Part 1
type TReport = { gammaRate: string, epsilonRate: string }
const Report: TReport = { gammaRate: '', epsilonRate: '' } as TReport

const powerConsumptionFrequency = (currentBitPos: number) => {
    let onBitCount = 0, offBitCount = 0, gammaRate = '', epsilonRate = ''
    for (let i = 0; i < PuzzleInput.length; i++) {
        const bit = PuzzleInput[i].charAt(currentBitPos)
        if (bit === '1') onBitCount++
        else offBitCount++
    }

    if (onBitCount > offBitCount) {
        gammaRate = '1'
        epsilonRate = '0'
    } else {
        gammaRate = '0'
        epsilonRate = '1'
    }

    return { gammaRate, epsilonRate }
}

const calculatePowerConsumption = () => {
    let currentBitPos = 0
    for (let i = 0; i < PuzzleInput[0].length; i++) {
        const { gammaRate, epsilonRate } = powerConsumptionFrequency(currentBitPos)
        Report.gammaRate += gammaRate
        Report.epsilonRate += epsilonRate
        currentBitPos++
    }

    const decimalGammaRate = parseInt(Report.gammaRate, 2)
    const decimalEpsilonRate = parseInt(Report.epsilonRate, 2)
    const powerConsumption = decimalGammaRate * decimalEpsilonRate

    return powerConsumption
}
console.log('Power consumption rating: ', calculatePowerConsumption())

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

const calculateLifeSupportRating = () => {
    const ogRating = getRating('OxygenGenerator')
    const co2Rating = getRating('CO2Scrubber')

    const lifeSupportRating = ogRating.decimal * co2Rating.decimal
    return lifeSupportRating
}

console.log('Life support rating: ', calculateLifeSupportRating())