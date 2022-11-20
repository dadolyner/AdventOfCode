import PuzzleInput from './test_input'

type TCoords = {
    type: {
        isVertical: boolean
        isHorizontal: boolean
    }
    from: { x1: number, y1: number }
    to: { x2: number, y2: number }
}
type TDiagram = Array<TCoords>
const Diagram: TDiagram = []
class HydrothermalVents {
    constructor() { }

    generateCoords = async () => {
        const coords: TCoords[] = []
        PuzzleInput.forEach((line) => {
            const [from, to] = line.split(' -> ')
            const [fromX, fromY] = from.split(',').map(Number)
            const [toX, toY] = to.split(',').map(Number)
            coords.push({
                type: {
                    isVertical: fromX === toX,
                    isHorizontal: fromY === toY,
                },
                from: { x1: fromX, y1: fromY },
                to: { x2: toX, y2: toY },
            })
        })
        return coords.filter((coord) => coord.from.x1 === coord.to.x2 || coord.from.y1 === coord.to.y2)
    }

    addPoint = async (diagram: TDiagram, x: number, y: number) => {
        const point = diagram.find((p) => p.from.x1 === x && p.from.y1 === y)
        if (point) return point 
        const newPoint = {
            type: { isVertical: false, isHorizontal: false },
            from: { x1: x, y1: y },
            to: { x2: x, y2: y },
        }
        diagram.push(newPoint)
        return newPoint
    }

    createDiagram = async () => {
        const diagram: Array<Array<any>> = []
        for (let row = 0; row < 10; row++) {
            diagram.push([])
            for (let col = 0; col < 10; col++) diagram[row].push(0)
        }

        const coords = await this.generateCoords()
        coords.forEach((coord) => {
            const { type, from, to } = coord
            const { x1, y1 } = from
            const { x2, y2 } = to
            if (type.isVertical) {
                const minY = Math.min(y1, y2)
                const maxY = Math.max(y1, y2)
                for (let y = minY; y <= maxY; y++) this.addPoint
            }
        })

        diagram.forEach((row, rowIndex) => row.forEach((col, colIndex) => { if (col === 0) diagram[rowIndex][colIndex] = '.' }))
        return diagram
    }
}

const PartOne = async () => {
    const htv = new HydrothermalVents()
    const coords = await htv.generateCoords()
    console.log(coords)
    const diagram = await htv.createDiagram()
    console.log(diagram)
}
PartOne()