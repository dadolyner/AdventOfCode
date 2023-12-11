import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

enum Direction {
    NORTH = 0,
    SOUTH = 1,
    EAST = 2,
    WEST = 3
};

const directions = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
];

class DayTen {
    private input: string[];
    private stack: { position: { x: number, y: number }, distance: number }[] = [];
    private startLocation: { x: number, y: number } = { x: 0, y: 0 };
    private pipeMap: { symbol: string, links: Direction[], distance?: number }[][] = [];
    private maze: number[][]
    private mazeDist: number[][]

    constructor(input: string[]) {
        this.input = input;
        this.pipeMap = this.input.map((line: string, indexY: number) => line.split('').map((symbol, indexX) => ({
            symbol: symbol,
            links: this.getLinks(symbol, indexX, indexY),
        })));
        this.maze = Array(this.pipeMap.length * 3)
        this.mazeDist = Array(this.pipeMap.length * 3);
        this.getStartPipe();
    }

    private getLinks(symbol: string, x: number, y: number): Array<Direction> {
        switch (symbol) {
            case '|': return [Direction.SOUTH, Direction.NORTH];
            case '-': return [Direction.WEST, Direction.EAST];
            case 'L': return [Direction.NORTH, Direction.EAST];
            case 'J': return [Direction.NORTH, Direction.WEST];
            case '7': return [Direction.SOUTH, Direction.WEST];
            case 'F': return [Direction.SOUTH, Direction.EAST];
            case 'S':
                this.startLocation = { x: x, y: y };
                return [];
        }
        return [];
    }

    private getStartPipe() {
        if (this.startLocation.x > 0 && this.pipeMap[this.startLocation.y][this.startLocation.x - 1].links.includes(Direction.EAST))
            this.pipeMap[this.startLocation.y][this.startLocation.x].links.push(Direction.WEST);
        if (this.startLocation.x < this.pipeMap[0].length - 1 && this.pipeMap[this.startLocation.y][this.startLocation.x + 1].links.includes(Direction.WEST))
            this.pipeMap[this.startLocation.y][this.startLocation.x].links.push(Direction.EAST);
        if (this.startLocation.y > 0 && this.pipeMap[this.startLocation.y - 1][this.startLocation.x].links.includes(Direction.SOUTH))
            this.pipeMap[this.startLocation.y][this.startLocation.x].links.push(Direction.NORTH);
        if (this.startLocation.y < this.pipeMap.length - 1 && this.pipeMap[this.startLocation.y + 1][this.startLocation.x].links.includes(Direction.NORTH))
            this.pipeMap[this.startLocation.y][this.startLocation.x].links.push(Direction.SOUTH);

        this.stack = [{ position: this.startLocation, distance: 0 }];
    }


    private PartOne() {
        while (this.stack.length > 0) {
            let node = this.stack.shift();

            if (this.pipeMap[node.position.y][node.position.x].distance !== undefined && this.pipeMap[node.position.y][node.position.x].distance <= node.distance)
                continue;

            this.pipeMap[node.position.y][node.position.x].distance = node.distance;
            this.pipeMap[node.position.y][node.position.x].links.forEach(direction =>
                this.stack.push({
                    position: { x: node.position.x + directions[direction].x, y: node.position.y + directions[direction].y },
                    distance: node.distance + 1
                })
            );
        }

        return Math.max(...this.pipeMap.flat().map(pipe => pipe.distance === undefined ? 0 : pipe.distance));
    }

    private PartTwo() {
        this.pipeMap.forEach((row, y) => row.forEach((pipe, x) => {
            let submap = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];

            if (pipe.distance === undefined) submap[1][1] = 2;
            else {
                submap[1][1] = 1;
                pipe.links.forEach(direction => submap[1 + directions[direction].y][1 + directions[direction].x] = 1);
            }

            for (let i = 0; i <= 2; i++) {
                if (this.maze[y * 3 + i] === undefined) {
                    this.maze[y * 3 + i] = Array(this.pipeMap[0].length * 3);
                    this.mazeDist[y * 3 + i] = Array(this.pipeMap[0].length * 3);
                }
                for (let j = 0; j <= 2; j++) this.maze[y * 3 + i][x * 3 + j] = submap[i][j];
            }
        }));

        this.stack = [];
        this.pipeMap.forEach((row, y) => row.forEach((pipe, x) => {
            if ((y * x == 0 || y == this.pipeMap.length - 1 || x == this.pipeMap[0].length - 1) && this.pipeMap[y][x].distance === undefined)
                this.stack.push({ position: { x: x * 3, y: y * 3 }, distance: 0 });
        }));

        while (this.stack.length > 0) {
            let node = this.stack.shift();

            if (this.maze[node.position.y] === undefined || this.maze[node.position.y][node.position.x] === undefined || this.maze[node.position.y][node.position.x] == 1) continue;
            if (this.mazeDist[node.position.y][node.position.x] !== undefined && this.mazeDist[node.position.y][node.position.x] <= node.distance) continue;
            this.mazeDist[node.position.y][node.position.x] = node.distance;
            
            directions.forEach(direction =>
                this.stack.push({
                    position: { x: node.position.x + direction.x, y: node.position.y + direction.y },
                    distance: node.distance + 1
                })
            );
        }

        return this.pipeMap.map((row, y) =>
            row.reduce((count, pipe, x) => count + (pipe.distance === undefined && this.mazeDist[y * 3][x * 3] === undefined ? 1 : 0), 0)
        ).reduce((a, count) => a + count, 0)
    }

    public Result() {
        const partOne = this.PartOne();
        const partTwo = this.PartTwo();
        console.log("Part 1: ", partOne);
        console.log("Part 2: ", partTwo);
    }
}

const dayTen = new DayTen(PuzzleInput);
dayTen.Result();