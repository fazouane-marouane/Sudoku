import { solveSudoku } from './lib/SudokuSolver'
import { formatSudoku, parseAllSudokus } from './lib/SudokuFormatter'
import * as fs from 'fs'

let start = process.hrtime()

function elapsed_time(note: string){
    let elapsed = process.hrtime(start)[1] / 1000000 // divide by a million to get nano to milli
    let precision = 3 // 3 decimal places
    console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note) // print message + time
    start = process.hrtime() // reset the timer
}

const fileContent = fs.readFileSync('sudoku.txt', 'utf-8')
const sudokus = parseAllSudokus(fileContent)
elapsed_time("read")
const solutions = sudokus.map(solveSudoku)
const nums = solutions.map(solution => solution[0].slice(0, 3).reduce((pre, curr) => pre*10+curr, 0))
const sum = nums.reduce((acc, curr) => acc + curr, 0)

elapsed_time("solve")
console.log(sum)
