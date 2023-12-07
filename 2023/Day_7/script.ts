import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

type Hand = string;
type Bid = number;
type HandAndBid = [Hand, Bid];
class DaySeven {
    private input: string[];
    private handsAndBids: Array<HandAndBid> = [];
    private rankOrder = {
        1: 'AKQJT98765432',
        2: 'AKQT98765432J'
    };
    private rankMapping = "abcdefghijklm"

    constructor(input: string[]) {
        this.input = input;
        this.prepareInput();
    }

    private prepareInput() {
        for (const line of this.input) {
            const [hand, bid] = line.split(' ');
            this.handsAndBids.push([hand, +bid]);
        }
    }

    private mapRankToLetter(rank: string, part: string) {
        const index = this.rankOrder[part].indexOf(rank);
        return this.rankMapping[index];
    }

    private getTotalScore(part: string) {
        const sortedHandsAndBids = this.handsAndBids.slice().sort((a, b) => this.compareHands(a, b, part));
        let totalScore = 0;
        
        for (let i = 0; i < sortedHandsAndBids.length; i++) {
            totalScore += sortedHandsAndBids[i][1] * (i + 1);
        }

        return totalScore;
    }

    private calculateHandType(hand: Hand, part: string) {
        if (part === "1") {
            const uniqueNumbers = new Set();
            let numberOfPairs = 0;

            for (let card of hand) {
                const number = hand.split(card).length - 1;
                uniqueNumbers.add(number);
                if (number === 2) numberOfPairs += 1;
            }

            if (uniqueNumbers.has(5)) return 6;
            if (uniqueNumbers.has(4)) return 5;
            if (uniqueNumbers.has(3) && uniqueNumbers.has(2)) return 4;
            if (uniqueNumbers.has(3)) return 3;

            return Math.floor(numberOfPairs / 2);
        }

        if (part === "2") {
            let maxHand = 0;
            
            for (let rank of this.rankOrder[part]) {
                if (this.calculateHandType(hand.replace(/J/g, rank), "1") > maxHand) {
                    maxHand = this.calculateHandType(hand.replace(/J/g, rank), "1");
                }
            }

            return maxHand;
        }
    }

    private compareHands(handBid1: HandAndBid, handBid2: HandAndBid, part: string) {
        const [hand1] = handBid1;
        const [hand2] = handBid2;

        if (this.calculateHandType(hand1, part) < this.calculateHandType(hand2, part)) return -1;
        if (this.calculateHandType(hand1, part) > this.calculateHandType(hand2, part)) return 1;

        if (hand1.split('').map((card) => this.mapRankToLetter(card, part)).join('') >= hand2.split('').map((card) => this.mapRankToLetter(card, part)).join('')) return -1;
        else return 0;
    }

    private PartOne() {
        return this.getTotalScore("1");
    }

    private PartTwo() {
        return this.getTotalScore("2");
    }

    public Result() {
        const partOne = this.PartOne();
        const partTwo = this.PartTwo();
        console.log("Part 1: ", partOne);
        console.log("Part 2: ", partTwo);
    }
}
const daySeven = new DaySeven(PuzzleInput);
daySeven.Result();