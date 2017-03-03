export interface SudokuCell {
    lineIdx: number
    columnIdx: number
    value?: number
}

export function sudokuCell(cellIdx: number, value?: number) {
    return {
        lineIdx: Math.floor(cellIdx/9),
        columnIdx: cellIdx % 9,
        value
    }
}

const rangeNine = Array(9).fill(undefined).map((_, v) => v)

export function line(lineIdx: number): SudokuCell[] {
    return rangeNine.map(columnIdx => ({lineIdx, columnIdx}))
}

export function column(columnIdx: number): SudokuCell[] {
    return rangeNine.map(lineIdx => ({lineIdx, columnIdx}))
}

export function square(squareIdx: number): SudokuCell[] {
    return rangeNine.map(itr => ({
        lineIdx: Math.floor(squareIdx / 3) * 3 + Math.floor(itr / 3),
        columnIdx: (squareIdx % 3) * 3 + (itr % 3)
    }))
}

export function variable(cell: SudokuCell): string {
    return `V_${cell.lineIdx}_${cell.columnIdx}_${cell.value}`
}
