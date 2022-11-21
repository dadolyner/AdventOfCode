import PuzzleData from './puzzle_input'

// Part 1
const LanternFishesData: Array<number> = []
let initialRun = true
class Lanternfish {
    constructor() { }

    private initialState = (): void => {
        const fishes = PuzzleData.split(',')
        fishes.forEach(fish => { LanternFishesData.push(+fish) })
    }

    public dayTick = (): void => {
        if (initialRun) this.initialState()
        initialRun = false

        let index = 0
        const numOfFishes = LanternFishesData.length
        while (index < numOfFishes) {
            if (LanternFishesData[index] > 0) LanternFishesData[index] -= 1
            else {
                LanternFishesData[index] = 6
                LanternFishesData.push(8)
            }
            index++
        }
    }
}

const PartOne = async () => {
    let index = 0
    const numOfdays = 80
    const lf = new Lanternfish()

    while (index < numOfdays) {
        lf.dayTick()
        index++
    }

    console.log(`(SLOW) After ${numOfdays} days, we have ${LanternFishesData.length} lanternfish.`)
}
PartOne()


// Part 2
const PartTwo = () => {
    const LanternFishesData: Array<number> = PuzzleData.split(',').map(age => Number.parseInt(age, 10))
    const numOfdays = 256

    const batch = new Array(9).fill(0)
    LanternFishesData.forEach(age => batch[age]++)

    for (let day = 0; day < numOfdays; day++) {
        batch[8] = batch.shift()
        batch[6] += batch[8]
    }

    const lanternFishes = batch.reduce((sum, age) => sum += age)
    console.log(`(PERFORMANT) After ${numOfdays} days, we have ${lanternFishes} lanternfish.`)
}
PartTwo()