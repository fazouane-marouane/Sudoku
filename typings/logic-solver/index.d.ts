
declare module 'logic-solver' {
    export interface Formula {

    }

    export type Formulas = Formula | Formula[]

    export interface Solution {
        getTrueVars(): string[]
    }

    export interface SolverInstance {
        new(): SolverInstance
        require(formula: Formula): void
        solveAssuming(...args: Formulas[]): Solution
    }

    export function exactlyOne(...args: Formulas[]): Formula
    export function and(...args: any[]): Formula
    export var Solver: SolverInstance
}
