import PuzzleInput from "./puzzle_input";

const PartOne = () => {
    const directions = PuzzleInput.split("");
    const houses = new Set();
    let x = 0;
    let y = 0;
    houses.add(`${x},${y}`);
    directions.forEach((direction) => {
        if (direction === ">") x += 1;
        else if (direction === "<") x -= 1;
        else if (direction === "^") y += 1;
        else if (direction === "v") y -= 1;
        houses.add(`${x},${y}`);
    });
    console.log("Houses: ", houses.size);
}
PartOne()

const PartTwo = () => {
    const directions = PuzzleInput.split("");
    const houses = new Set();
    let x = 0;
    let y = 0;
    let x2 = 0;
    let y2 = 0;
    houses.add(`${x},${y}`);
    for (let i = 0; i < directions.length; i++) {
        if (i % 2 === 0) {
            if (directions[i] === ">") x += 1;
            else if (directions[i] === "<") x -= 1;
            else if (directions[i] === "^") y += 1;
            else if (directions[i] === "v") y -= 1;
            houses.add(`${x},${y}`);
        } else {
            if (directions[i] === ">") x2 += 1;
            else if (directions[i] === "<") x2 -= 1;
            else if (directions[i] === "^") y2 += 1;
            else if (directions[i] === "v") y2 -= 1;
            houses.add(`${x2},${y2}`);
        }
    }
    console.log("Houses: ", houses.size);
}
PartTwo()