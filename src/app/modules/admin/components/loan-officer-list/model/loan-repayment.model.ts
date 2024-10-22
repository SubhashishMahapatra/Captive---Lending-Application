// loan-repayment.model.ts

export interface LoanRepayment {
    repaymentsId: string; // Use 'string' for GUIDs in JavaScript/TypeScript
    principalAmount: number;
    amountToBePaid: number;
    dueDate: Date; // Use Date for date fields
    noOfInstallments: number;
    lastPaid: Date;
    isNPA: boolean; // Non-Performing Asset
    loanApplicationId: string; // Corresponds to LoanApplicationId in your model
  }
  