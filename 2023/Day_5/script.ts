import { usePuzzleInput } from "../utils";
// @ts-ignore
const PuzzleInput = usePuzzleInput(__dirname);

interface DataItem {
    seed: number;
    soil: number;
    fertil: number;
    water: number;
    light: number;
    temper: number;
    humidity: number;
    location: number;
}

interface Range {
    start: number;
    end: number;
}

interface MapObj {
    source: Range;
    destiny: Range;
    delta: number;
}

class DayFive {
    private input: string[];
    private DATA: DataItem[] = [];
    private mapSeedToSoil: number[][] = [];
    private mapSoilToFertil: number[][] = [];
    private mapFertilToWater: number[][] = [];
    private mapWaterToLight: number[][] = [];
    private mapLightToTemper: number[][] = [];
    private mapTemperToHumidity: number[][] = [];
    private mapHumidityToLocation: number[][] = [];
    private seedRanges: Range[] = [];
    private MAPS: MapObj[][] = [];

    constructor(input: string[]) {
        this.input = input;
    }

    createSeed(token: number): DataItem {
        return {
            seed: token,
            soil: 0,
            fertil: 0,
            water: 0,
            light: 0,
            temper: 0,
            humidity: 0,
            location: 0,
        };
    }

    fillMap(map: number[][], lines: string[]) {
        for (const line of lines) {
            const tokens: string[] = line.trim().split(" ");
            const register: number[] = [];

            for (const token of tokens) register.push(parseInt(token));

            map.push(register);
        }
    }

    findMatch(target: number, map: number[][]): number {
        for (const line of map) {
            const firstDestiny: number = line[0];
            const firstSource: number = line[1];
            const range: number = line[2];
            const lastSource: number = firstSource + range - 1;

            if (target < firstSource) continue;
            if (target > lastSource) continue;

            const delta: number = firstDestiny - firstSource;
            return target + delta;
        }

        return target;
    }

    processInput() {
        const parts: string[] = this.input.join("\n").split("\n\n");

        const stringSeeds: string[] = parts.shift()?.split(":").pop()?.trim().split(" ") || [];
        const stringSeedToSoil: string[] = parts.shift()?.split(":").pop()?.trim().split("\n") || [];
        const stringSoilToFertil: string[] = parts.shift()?.split(":").pop()?.trim().split("\n") || [];
        const stringFertilToWater: string[] = parts.shift()?.split(":").pop()?.trim().split("\n") || [];
        const stringWaterToLight: string[] = parts.shift()?.split(":").pop()?.trim().split("\n") || [];
        const stringLightToTemper: string[] = parts.shift()?.split(":").pop()?.trim().split("\n") || [];
        const stringTemperToHumidity: string[] = parts.shift()?.split(":").pop()?.trim().split("\n") || [];
        const stringUmidityToLocation: string[] = parts.shift()?.split(":").pop()?.trim().split("\n") || [];

        for (const token of stringSeeds) this.DATA.push(this.createSeed(parseInt(token)));

        this.fillMap(this.mapSeedToSoil, stringSeedToSoil);
        this.fillMap(this.mapSoilToFertil, stringSoilToFertil);
        this.fillMap(this.mapFertilToWater, stringFertilToWater);
        this.fillMap(this.mapWaterToLight, stringWaterToLight);
        this.fillMap(this.mapLightToTemper, stringLightToTemper);
        this.fillMap(this.mapTemperToHumidity, stringTemperToHumidity);
        this.fillMap(this.mapHumidityToLocation, stringUmidityToLocation);

        while (true) {
            const part = parts.shift();

            if (part == undefined) {
                break;
            }

            const lines = part.split(":").pop().trim().split("\n");
            this.MAPS.push(this.createMap(lines));
        }
    }

    private matchSeedToSoil(data: DataItem) {
        data.soil = this.findMatch(data.seed, this.mapSeedToSoil);
    }

    private matchSoilToFertil(data: DataItem) {
        data.fertil = this.findMatch(data.soil, this.mapSoilToFertil);
    }

    private matchFertilToWater(data: DataItem) {
        data.water = this.findMatch(data.fertil, this.mapFertilToWater);
    }

    private matchWaterToLight(data: DataItem) {
        data.light = this.findMatch(data.water, this.mapWaterToLight);
    }

    private matchLightToTemper(data: DataItem) {
        data.temper = this.findMatch(data.light, this.mapLightToTemper);
    }

    private matchTemperToHumidity(data: DataItem) {
        data.humidity = this.findMatch(data.temper, this.mapTemperToHumidity);
    }

    private matchHumidityToLocation(data: DataItem) {
        data.location = this.findMatch(data.humidity, this.mapHumidityToLocation);
    }

    private createRangeObj(start: number, end: number): Range {
        return { start, end };
    }

    private createMap(lines: string[]): MapObj[] {
        const map: MapObj[] = [];

        for (const line of lines) {
            const tokens = line.trim().split(" ");
            const destinyStart = parseInt(tokens.shift() || "0");
            const sourceStart = parseInt(tokens.shift() || "0");
            const length = parseInt(tokens.shift() || "0");
            const destinyEnd = destinyStart + length - 1;
            const sourceEnd = sourceStart + length - 1;
            const delta = destinyStart - sourceStart;

            map.push(this.createMapObj(sourceStart, sourceEnd, destinyStart, destinyEnd, delta));
        }

        return map;
    }

    private createMapObj(sourceStart: number, sourceEnd: number, destinyStart: number, destinyEnd: number, delta: number): MapObj {
        return {
            source: this.createRangeObj(sourceStart, sourceEnd),
            destiny: this.createRangeObj(destinyStart, destinyEnd),
            delta,
        };
    }

    private search(): Range[] {
        let ranges = this.seedRanges;

        for (const map of this.MAPS) {
            ranges = this.searchThis(ranges, map);
        }

        return ranges;
    }

    private searchThis(oldRanges: Range[], map: MapObj[]): Range[] {
        const newRanges: Range[] = [];

        for (const oldRange of oldRanges) {
            for (const mapObj of map) {
                const start = Math.max(oldRange.start, mapObj.source.start);
                const end = Math.min(oldRange.end, mapObj.source.end);

                if (start <= end) {
                    const newRange = this.createRangeObj(start + mapObj.delta, end + mapObj.delta);
                    newRanges.push(newRange);
                }
            }

            for (const newRange of this.fillRangeGaps(oldRange, newRanges)) {
                newRanges.push(newRange);
            }
        }
        
        return newRanges;
    }

    private fillRangeGaps(oldRange: Range, doneRanges: Range[]): Range[] {
        const newRanges: Range[] = [];
        this.sortRanges(doneRanges);

        let start = oldRange.start;

        while (doneRanges.length > 0) {
            const doneRange = doneRanges.shift();

            if (start < (doneRange?.start || 0)) {
                newRanges.push(this.createRangeObj(start, (doneRange?.start || 0) - 1));
            }

            start = (doneRange?.end || 0) + 1;
        }

        if (start < oldRange.end) {
            newRanges.push(this.createRangeObj(start, oldRange.end));
        }

        return newRanges;
    }

    private sortRanges(list: Range[]) {
        let n = -1;

        while (true) {
            n += 1;

            const current = list[n];
            const next = list[n + 1];
            
            if (next == undefined) return;
            if (current.start <= next.start) continue;

            list[n] = next;
            list[n + 1] = current;

            n = -1;
        }
    }

    private PartOne() {
        this.processInput();

        for (const data of this.DATA) this.matchSeedToSoil(data);
        for (const data of this.DATA) this.matchSoilToFertil(data);
        for (const data of this.DATA) this.matchFertilToWater(data);
        for (const data of this.DATA) this.matchWaterToLight(data);
        for (const data of this.DATA) this.matchLightToTemper(data);
        for (const data of this.DATA) this.matchTemperToHumidity(data);
        for (const data of this.DATA) this.matchHumidityToLocation(data);

        let lowestLocation = this.DATA[0].location;

        for (const data of this.DATA) {
            if (data.location < lowestLocation) lowestLocation = data.location;
        }

        return lowestLocation;
    }

    private PartTwo() {
        const ranges = this.search();
        if (ranges.length === 0) return;

        let lowestLocation = ranges[0].start;

        for (const range of ranges) {
            if (range.start < lowestLocation) lowestLocation = range.start;
        }

        return lowestLocation;
    }

    public Result() {
        const partOne = this.PartOne();
        const partTwo = this.PartTwo();
        console.log("Part 1: ", partOne);
        console.log("Part 2: ", partTwo);
    }
}

const dayFive = new DayFive(PuzzleInput);
dayFive.Result();