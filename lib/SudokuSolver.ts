import { SudokuCell, sudokuCell, line, column, square, variable } from './SudokuCommon'
import * as Logic from "logic-solver";

const solver = new Logic.Solver()
const rangeNine = Array(9).fill(undefined).map((_, v) => v)

for (let value = 1; value <= 9; ++value) {
    for (let i = 0; i < 9; ++i) {
        let facts1 = line(i).map(cell => variable({...cell, value}))
        let facts2 = column(i).map(cell => variable({...cell, value}))
        let facts3 = square(i).map(cell => variable({...cell, value}))
        solver.require(Logic.exactlyOne(facts1))
        solver.require(Logic.exactlyOne(facts2))
        solver.require(Logic.exactlyOne(facts3))
    }
}
for (let i = 0; i < 81; ++i) {
    let facts = rangeNine.map(v => variable(sudokuCell(i, v + 1)))
    solver.require(Logic.exactlyOne(facts))
}

export function solveSudoku(sudoku: number[][]): number[][] {
    const facts = [];
    for(let idx = 0; idx < 81; ++idx) {
        let cell = sudokuCell(idx)
        let value = sudoku[cell.lineIdx][cell.columnIdx]
        if(value >= 0) {
            facts.push(variable({...cell, value}))
        }
    }
    var solution: SudokuCell[] = solver.solveAssuming(Logic.and(facts)).getTrueVars().map((deductedVariable: string) => {
        let matchs = deductedVariable.match(/^V_(\d+)_(\d+)_(\d+)$/)!;
        return <SudokuCell>{
            lineIdx: Number(matchs[1]),
            columnIdx: Number(matchs[2]),
            value: Number(matchs[3])
        }
    })
    let formattedSolution = rangeNine.map(_ => rangeNine.map(_ => 0))
    for (let cell of solution) {
        formattedSolution[cell.lineIdx][cell.columnIdx] = cell.value!
    }
    return formattedSolution
}
