import PuzzleInput from "./puzzle_input"

class Monkey {
    static monkeys: Monkey[] = []
    static commonDevider = 1
    private items: number[]
    private inspectA: (old: number) => number
    private inspectB: (old: number) => number
    private inspectionCount = 0
    private test: (item: number) => void

    constructor(monkeyInput: string) {
        const lines = monkeyInput.split(/\r?\n/)
        const counter = lines.shift()?.split(" ")[1].slice(0, -1)
        if (counter === undefined) return

        const [items, operation, test, ifTrue, ifFalse] = lines.map((property) => property.slice(property.search(":") + 2))
        this.items = items.split(", ").map((i) => +i)
        this.inspectA = this.constructInspectFunction(operation, 1)
        this.inspectB = this.constructInspectFunction(operation, 2)
        this.test = this.constructTestFunction(test, ifTrue, ifFalse)
        Monkey.monkeys[+counter] = this
    }

    public get inspections() { return this.inspectionCount }

    public give(worryLevel: number) { this.items.push(worryLevel) }

    public round(problemPart: 1 | 2) {
        for (let item of this.items) {
            if (problemPart === 1) item = this.inspectA(item) % Monkey.commonDevider
            else item = this.inspectB(item) % Monkey.commonDevider
            this.test(item)
        }
        this.items = []
    }

    private constructInspectFunction(operation: string, problemPart: 1 | 2) {
        return (oldWorryLevel: number) => {
            let newWorryLevel: number
            const [firstArg, op, secondArg] = operation.split(" ").slice(2)
            let arg1: number, arg2: number

            if (firstArg === "old") arg1 = oldWorryLevel
            else arg1 = +firstArg

            if (secondArg === "old") arg2 = oldWorryLevel
            else arg2 = +secondArg

            if (op === "*") newWorryLevel = arg1 * arg2
            else newWorryLevel = arg1 + arg2

            this.inspectionCount++
            if (problemPart === 1) return Math.floor(newWorryLevel / 3)
            else return newWorryLevel
        }
    }

    private constructTestFunction(test: string, ifTrue: string, ifFalse: string) {
        const divisibility = +test.split(" ")[2]
        Monkey.commonDevider *= divisibility

        return (item: number) => {
            if (item === undefined) return //@ts-ignore
            const passToOnTrue = ifTrue.split(" ").at(-1) //@ts-ignore
            const passToOnFalse = ifFalse.split(" ").at(-1)
            if (passToOnFalse === undefined || passToOnTrue === undefined) return
            if (item % divisibility === 0) Monkey.monkeys[passToOnTrue].give(item)
            else Monkey.monkeys[passToOnFalse].give(item)
        }
    }
}

const calculateMonkeyBusiness = () => {
    let maxInspections1 = 0
    let maxInspections2 = 0
    for (const monkey of Monkey.monkeys) {
        if (monkey.inspections > maxInspections1) {
            maxInspections2 = maxInspections1
            maxInspections1 = monkey.inspections
        } else if (monkey.inspections > maxInspections2) maxInspections2 = monkey.inspections
    }
    return maxInspections1 * maxInspections2
}

const monkeysData = PuzzleInput.split(/\r?\n\r?\n/)
const PartOne = () => {
    for (const monkey of monkeysData) new Monkey(monkey)
    for (let i = 0; i < 20; ++i) for (const monkey of Monkey.monkeys) monkey.round(1)
    console.log(`Monkey business after 20 rounds is: ${calculateMonkeyBusiness()}`)
}
PartOne()

const PartTwo = () => {
    Monkey.monkeys = []
    Monkey.commonDevider = 1
    for (const monkey of monkeysData) new Monkey(monkey)
    for (let i = 0; i < 10000; ++i) for (const monkey of Monkey.monkeys) monkey.round(2)
    console.log(`Monkey business after 10000 rounds is: ${calculateMonkeyBusiness()}`)
}
PartTwo()