import PuzzleInput from "./puzzle_input";

const PartOne = () => {
    let total = 0;
    PuzzleInput.forEach((present) => {
        const [l, w, h] = present.split("x").map(Number);
        const sides = [l * w, w * h, h * l];
        const smallestSide = Math.min(...sides);
        total += 2 * sides.reduce((a, b) => a + b, 0) + smallestSide;
    })
    console.log('Square feet of wrapping paper: ', total);
}
PartOne()

const PartTwo = () => {
    let smallestPerimeter = 0;
    PuzzleInput.forEach((present) => {
        const [l, w, h] = present.split("x").map(Number);
        smallestPerimeter += 2 * (l + w + h - Math.max(l, w, h)) + l * w * h;
    })
    console.log('Feet of ribbon: ', smallestPerimeter);
}
PartTwo()