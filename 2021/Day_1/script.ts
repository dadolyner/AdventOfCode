import Report from './data'

// Part 1
const count_increase = () => {
    let count = 0
    for (let i = 0; i < Report.length; i++) {
        if (Report[i] > Report[i - 1]) count++
    }
    return count
}
console.log("Sums: ", count_increase())

// Part 2
const count_increase_triplets = () => {
    let count = 0
    let prev_tripplet = 0
    for (let i = 0; i < Report.length; i++) {
        const current_tripplet = Report[i] + Report[i + 1] + Report[i + 2]
        if(prev_tripplet !== 0 && current_tripplet > prev_tripplet) count++
        prev_tripplet = current_tripplet
    }
    return count
}
console.log("Triplets Sums: ", count_increase_triplets())