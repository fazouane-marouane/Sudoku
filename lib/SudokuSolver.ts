import { SudokuCell, sudokuCell, line, column, square, variable } from './SudokuCommon'
import * as Logic from "logic-solver";

const solver = new Logic.Solver()
const rangeNine = Array(9).fill(undefined).map((_, v) => v)
const vars: Logic.Formula[][] = rangeNine.map(i => rangeNine.map(j => variable({
    lineIdx: i,
    columnIdx: j
})))
const constants = rangeNine.map(value => Logic.constantBits(value + 1))

for(let lineIdx1 = 0; lineIdx1 < 9; ++lineIdx1)
for(let lineIdx2 = 0; lineIdx2 < 9; ++lineIdx2)
for(let columnIdx1 = 0; columnIdx1 < 9; ++columnIdx1)
for(let columnIdx2 = 0; columnIdx2 < 9; ++columnIdx2) {
    const sameLine = lineIdx1 == lineIdx2
    const sameColumn = columnIdx1 == columnIdx2
    const sameSquare = Math.floor(lineIdx1/3) == Math.floor(lineIdx2/3) && Math.floor(columnIdx1/3) == Math.floor(columnIdx2/3)
    const different = columnIdx2 > columnIdx1 || lineIdx2 > lineIdx1
    if(different && (sameLine || sameColumn || sameSquare)) {
        solver.forbid(Logic.equalBits(vars[lineIdx1][columnIdx1], vars[lineIdx2][columnIdx2]))
    }
}
for (let i = 0; i < 81; ++i) {
    let cell = sudokuCell(i)
    let variable = vars[cell.lineIdx][cell.columnIdx]
    solver.require(Logic.lessThanOrEqual(variable, constants[9 - 1]))
    solver.require(Logic.greaterThanOrEqual(variable, constants[1 - 1]))
}

export function solveSudoku(sudoku: number[][]): number[][] {
    const facts: Logic.Formula[] = [];
    for (let idx = 0; idx < 81; ++idx) {
        let cell = sudokuCell(idx)
        let value = sudoku[cell.lineIdx][cell.columnIdx]
        if (value >= 1) {
            facts.push(Logic.equalBits(vars[cell.lineIdx][cell.columnIdx], constants[value - 1]))
        }
    }
    return Logic.disablingAssertions(function () {
        let sol = solver.solveAssuming(Logic.and(facts))
        let solution = vars.map(line => line.map(variable => sol.evaluate(variable)))
        return solution
    })
}
