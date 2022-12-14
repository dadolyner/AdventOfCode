import PuzzleInput from './puzzle_input'

type Coordinates = { xCoord: number; yCoord: number; }

class RopeHead {
    private x = 0
    private y = 0

    public get xCoord() { return this.x; }
    public get yCoord() { return this.y }

    public move(direction: string, distance: number) {
        switch (direction) {
            case "R": this.y += distance; break
            case "L": this.y -= distance; break
            case "U": this.x += distance; break
            case "D": this.x -= distance; break
            default: break;
        }
    }
}

const head = new RopeHead()
const knots = new Array<Coordinates>(9);
for (let i = 0; i < knots.length; ++i) knots[i] = { xCoord: 0, yCoord: 0 }

const checkSignForKnot = (knotToFollow: Coordinates, knot: Coordinates) => {
    if (knotToFollow.xCoord - knot.xCoord > 1) {
        knot.xCoord++;
        knot.yCoord += Math.sign(knotToFollow.yCoord - knot.yCoord);
    } else if (knotToFollow.xCoord - knot.xCoord < -1) {
        knot.xCoord--;
        knot.yCoord += Math.sign(knotToFollow.yCoord - knot.yCoord);
    } else if (knotToFollow.yCoord - knot.yCoord > 1) {
        knot.yCoord++;
        knot.xCoord += Math.sign(knotToFollow.xCoord - knot.xCoord);
    } else if (knotToFollow.yCoord - knot.yCoord < -1) {
        knot.yCoord--;
        knot.xCoord += Math.sign(knotToFollow.xCoord - knot.xCoord);
    }
}

const PartOne = () => {
    const PartOneKnots = new Set<string>() //@ts-ignore
    PartOneKnots.add(JSON.stringify(knots.at(0)));
    PuzzleInput.forEach((move) => {
        const [direction, distance] = move.split(" ");
        for (let i = 0; i < +distance; ++i) {
            let knotToFollow: Coordinates = head;
            head.move(direction, 1);
            knots.forEach((knot) => { checkSignForKnot(knotToFollow, knot); //@ts-ignore
                if (knot === knots.at(0)) PartOneKnots.add(JSON.stringify(knot));
                knotToFollow = knot;
            })
        }
    })
    console.log(`The tail of rope visits ${PartOneKnots.size} positions at least once.`);
}
PartOne()

const PartTwo = () => {
    const PartTwoKnots = new Set<string>() //@ts-ignore
    PartTwoKnots.add(JSON.stringify(knots.at(-1)));
    PuzzleInput.forEach((move) => {
        const [direction, distance] = move.split(" ");
        for (let i = 0; i < +distance; ++i) {
            let knotToFollow: Coordinates = head;
            head.move(direction, 1);
            knots.forEach((knot) => { checkSignForKnot(knotToFollow, knot); //@ts-ignore
            if (knot === knots.at(-1)) PartTwoKnots.add(JSON.stringify(knot));
                knotToFollow = knot;
            })
        }
    })
    console.log(`The tail of rope visits ${PartTwoKnots.size} positions at least once.`);
}
PartTwo()