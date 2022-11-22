import PuzzleData from './puzzle_input'

const CrabData = PuzzleData.split(',').map(Number)
class CrabSubmarines {
    constructor(){}

    public minMaxPos = (): number[] => {
        const data = PuzzleData.split(',').map(Number)
        return [Math.min(...data), Math.max(...data)]
    }
    
    // Part 1
    public calculateConstantFuel = (alignTo: number) => {
        let fuelConsumed = 0
        CrabData.forEach((position) => (position > alignTo) ? (fuelConsumed += (position - alignTo)) : (fuelConsumed += (alignTo - position)))
        return fuelConsumed
    }
    
    // Part 2
    public calculateVaryingFuel = (alignTo: number) => {
        let fuelConsumed = 0

        CrabData.forEach((position) => {
            let counter = 0
            if(position > alignTo) counter += (position - alignTo)
            else counter += (alignTo - position)

            while(counter > 0){
                fuelConsumed += counter
                counter--
            }
        })
        return fuelConsumed
    }
}

// Part 1
const PartOne = () => {
    const consumption = []
    const cs = new CrabSubmarines()
    const [min, max] = cs.minMaxPos()

    for(let i = min; i <= max; i++){
        const fuelConsumed = cs.calculateConstantFuel(i)
        consumption.push(fuelConsumed)
    }

    console.log('Total fuel consuption at constant rate is: ', Math.min(...consumption))
}
PartOne()

// Part 2
const PartTwo = () => {
    const consumption = []
    const cs = new CrabSubmarines()
    const [min, max] = cs.minMaxPos()

    for(let i = min; i <= max; i++){
        const fuelConsumed = cs.calculateVaryingFuel(i)
        consumption.push(fuelConsumed)
    }

    console.log('Total fuel consuption at varying rate is: ', Math.min(...consumption))
}
PartTwo()