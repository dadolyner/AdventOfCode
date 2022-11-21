import PuzzleInput from './puzzle_input'

type TCoord = { x: number; y: number; }
type Line = { start: TCoord, end: TCoord }
type Part = 'One' | 'Two'
class HydrothermalVents {
    constructor() { }

    private generateCoords = (): Line[] => {
        return PuzzleInput.map(item => {
            const coords = item.split(" -> ").map(coord => coord.split(",")).flat().map(coord => Number.parseInt(coord, 10))

            return {
                start: { x: coords[0], y: coords[1] },
                end: { x: coords[2], y: coords[3] },
            }
        })
    }

    private diagonalToCoords = (line: Line): TCoord[] => {
        const points: TCoord[] = []
        let x = line.start.x
        let y = line.start.y
        while (x != line.end.x) {
            points.push({ x: x, y: y })
            x > line.end.x ? x-- : x++
            y > line.end.y ? y-- : y++
        }
        points.push({ x: x, y: y })
        return points
    }

    private calculateRange = (a: number, b: number): number[] => {
        let index = a > b ? b : a
        const indexLimit = a < b ? b + 1 : a + 1
        const range: number[] = []
        while (index < indexLimit) { 
            range.push(index)
            index++
        }
        return range
    }

    private calculateLine = (line: Line, part: Part): TCoord[] => {
        if ((line.start.y != line.end.y && line.start.x != line.end.x) && part === 'One') return []
        if ((line.start.y != line.end.y && line.start.x != line.end.x) && part === 'Two') return this.diagonalToCoords(line);
        if (line.start.y != line.end.y) return this.calculateRange(line.start.y, line.end.y).map(yPoint => { return { x: line.start.x, y: yPoint }; })
        if (line.start.x != line.end.x) return this.calculateRange(line.start.x, line.end.x).map(xPoint => { return { x: xPoint, y: line.start.y }; })

        return [{ x: line.start.x, y: line.start.y }]
    }

    public calculateOverlaps = (part: Part): number => {
        const Lines: Line[] = this.generateCoords()
        const Points: TCoord[] = Lines.map(line => this.calculateLine(line, part)).flat()

        const pointsOverlap = new Map<string, boolean>()
        Points.forEach(point => {
            const key = `${point.x},${point.y}`
            pointsOverlap.has(key) ? pointsOverlap.set(key, true) : pointsOverlap.set(key, false)
        })

        let overlaps: number = 0
        pointsOverlap.forEach(overlap => overlap ? overlaps++ : null)

        return overlaps
    }
}
// Part 1
const PartOne = () => {
    const htv = new HydrothermalVents()
    const overlaps = htv.calculateOverlaps('One')
    console.log(`Number of vertical and horizontal overlaps: ${overlaps}`)
}
PartOne()

// Part 2
const PartTwo = () => {
    const htv = new HydrothermalVents()
    const overlaps = htv.calculateOverlaps('Two')
    console.log(`Number of all overlaps: ${overlaps}`)
}
PartTwo()