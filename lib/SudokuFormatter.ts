function chunk<T>(array: Array<T>, chunkSize: number): Array<Array<T>> {
        let result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize))
        }
        return result
}

export function formatSudoku(sudoku: number[][]): string {
    let output = chunk(sudoku, 3).map(lines =>
        lines.map(line =>
            chunk(line, 3).map(columns =>
                columns.join(' '))
                .join(' | '))
            .join('\n'))
        .join('\n------+-------+------\n')
    return output
}

export function parseSudoku(text: string): number[][] {
    return text.split('\n').map(line => line.split('').map(v => parseInt(v)))
}

export function parseAllSudokus(text: string): {[name: string]: number[][]} {
    return Object.assign({}, ...chunk(text.split('\n'), 10).map(lines => ({
        [lines[0]]: parseSudoku(lines.slice(1).join('\n'))
    })))
}
