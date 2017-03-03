declare global {
    interface Array<T> {
        chunk(chunkSize: number): Array<Array<T>>;
    }
}

Object.defineProperty(Array.prototype, 'chunk', {
    value: function (chunkSize: number) {
        var R = [];
        for (var i = 0; i < this.length; i += chunkSize)
            R.push(this.slice(i, i + chunkSize));
        return R;
    }
});

export function formatSudoku(sudoku: any[][]): string {
    let output = sudoku.chunk(3).map(lines =>
        lines.map(line =>
            line.chunk(3).map(columns =>
                columns.join(' '))
                .join(' | '))
            .join('\n'))
        .join('\n------+-------+------\n');
    return output;
}

export function readSudoku(text: string) {
    return text.split('\n').chunk(10).map(lines =>{
        return lines.slice(1).map(line => line.split('').map(v => parseInt(v)));
    })
}
