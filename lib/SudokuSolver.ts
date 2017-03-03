let Logic: any = require("logic-solver")
let solver: any = new Logic.Solver();
for (let v = 0; v < 9; ++v) {
    for (let i = 0; i < 9; ++i) {
        let facts1 = Array(9).fill(undefined).map((_, j) => `V_${v}_${i * 9 + j}`);
        let facts2 = Array(9).fill(undefined).map((_, j) => `V_${v}_${i + j * 9}`);
        let facts3 = Array(9).fill(undefined).map((_, j) => [Math.floor(i / 3) * 3 + Math.floor(j / 3), (i % 3) * 3 + (j % 3)]).map((c) => `V_${v}_${c[0] + c[1] * 9}`);
        solver.require(Logic.exactlyOne(...facts1));
        solver.require(Logic.exactlyOne(...facts2));
        solver.require(Logic.exactlyOne(...facts3));
    }
}
for (let i = 0; i < 81; ++i) {
    let facts = Array(9).fill(undefined).map((_, v) => `V_${v}_${i}`);
    solver.require(Logic.exactlyOne(...facts));
}

export function solveSudoku(sudoku: number[][]): number[][] {
    const facts = [];
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            const v = sudoku[i][j] - 1;
            if (v >= 0) {
                facts.push(`V_${v}_${i * 9 + j}`)
            }
        }
    }
    var sol: { v: number, i: number, j: number }[] = solver.solveAssuming(Logic.and(facts)).getTrueVars().map((v: string) => {
        let matchs = v.match(/^V_(\d+)_(\d+)$/)!;
        return {
            v: Number(matchs[1]) + 1,
            i: Math.floor(Number(matchs[2]) / 9),
            j: Number(matchs[2]) % 9,
        };
    });
    let arr = Array(9).fill(undefined).map(_ => Array(9).fill(undefined).map(_ => 0));
    for (let s of sol) {
        arr[s.i][s.j] = s.v;
    }
    return arr;
}