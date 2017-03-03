import { solveSudoku } from './lib/SudokuSolver'
import { formatSudoku, readSudoku } from './lib/SudokuFormatter'
import * as fs from 'fs'

const sudoku1= [
    [0,0,0, 3,0,0, 1,0,0],
    [0,0,0, 0,8,7, 0,3,9],
    [7,0,0, 0,2,1, 0,0,0],

    [6,0,3, 1,0,0, 0,8,0],
    [0,0,1, 0,0,0, 3,0,0],
    [0,9,0, 0,0,5, 6,0,7],

    [0,0,0, 8,5,0, 0,0,6],
    [3,5,0, 7,9,0, 0,0,0],
    [0,0,6, 0,0,2, 0,0,0]
];

const sudoku2= [
    [0,8,7, 0,0,0, 0,0,4],
    [0,3,0, 1,0,0, 6,0,2],
    [0,9,0, 0,0,0, 5,8,0],

    [0,0,0, 7,0,4, 8,0,6],
    [0,0,0, 0,0,0, 0,0,0],
    [7,0,6, 5,0,2, 0,0,0],

    [0,6,4, 0,0,0, 0,1,0],
    [3,0,2, 0,0,6, 0,4,0],
    [1,0,0, 0,0,0, 2,6,0]
];

var start = process.hrtime();

var elapsed_time = function(note: string){
    var precision = 3; // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note); // print message + time
    start = process.hrtime(); // reset the timer
}

const fileContent = fs.readFileSync('sudoku.txt', 'utf-8')
const sudokus = readSudoku(fileContent)
elapsed_time("read");
const sums = sudokus.map((sudoku, i) => {
    const solution = solveSudoku(sudoku)
    return solution[0].slice(0, 3).reduce((pre, curr) => pre*10+curr, 0);
}).reduce((acc, curr) => acc + curr, 0);

elapsed_time("solve");
console.log(sums);
