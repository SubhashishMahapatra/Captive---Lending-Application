// loan-scheme.model.ts
export type LoanType = 0 | 1; // Use numbers to represent loan types

export interface LoanScheme {
    id: string;
    name: string;
    type: LoanType; // Change type to number
    interestRate: number;
    tenure: number;
}
