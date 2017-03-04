
declare module 'logic-solver' {
    export interface Formula {

    }

    export type Formulas = Formula | Formula[]

    export interface Solution {
        getTrueVars(): string[]
        evaluate(f: Formula): number
    }

    export interface SolverInstance {
        new(): SolverInstance
        require(formula: Formula): void
        forbid(formula: Formula): void
        solveAssuming(...args: Formulas[]): Solution
    }

    export function exactlyOne(...args: Formulas[]): Formula
    export function and(...args: any[]): Formula
    export function disablingAssertions<T>(f: (... args: any[]) => T): T
    export function variableBits(name: string, base: number): Formula
    export function equalBits(bits1: Formula, bits: Formula): Formula
    export function constantBits(v: number): Formula
    export function lessThanOrEqual(f1: Formula, f2: Formula): Formula
    export function greaterThanOrEqual(f1: Formula, f2: Formula): Formula
    export var Solver: SolverInstance
}
