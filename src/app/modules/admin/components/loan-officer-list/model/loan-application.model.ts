export interface LoanApplication {
    loanApplicationId: string; // Unique identifier for the loan application
    userId: string; // ID of the user who applied for the loan
    loanSchemesId: string; // ID of the loan scheme
    amount: number; // The amount requested by the user
    status: string; // Current status of the application (e.g., Pending, Approved, Rejected)
    applicationDate: Date; // Date when the application was submitted
    loanOfficerId: string; // ID of the loan officer assigned to the application
    remarks: string; // Any remarks related to the application
    personalDocsList: PersonalDocument[]; // Array of personal documents submitted
  }
  
  // Assuming you have a PersonalDocument interface to represent the documents
  export interface PersonalDocument {
    personalDocumentsId: any; // Unique identifier for the document
    docsName: string; // Name of the document file
    docsURL: string; // Path to the uploaded document
    status: boolean; // Approval status of the document
    loanApplicationId: string; // ID of the associated loan application
  }

  export interface CollateralDocument {
    collateralDocumentsId: any; // Unique identifier for the document
    cdName: string; // Name of the document file
    cdUrl: string; // Path to the uploaded document
    cdStatus: boolean; // Approval status of the document
    loanApplicationId: string; // ID of the associated loan application
  }
  