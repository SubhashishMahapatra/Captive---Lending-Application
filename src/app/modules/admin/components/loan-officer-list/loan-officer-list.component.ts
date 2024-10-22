import { Component } from '@angular/core';
import { LoanApplication } from './model/loan-application.model';
import { Router } from '@angular/router';
import { LoanService } from '../../../../services/loan.service';

@Component({
  selector: 'app-loan-officer-list',
  templateUrl: './loan-officer-list.component.html',
  styleUrl: './loan-officer-list.component.css'
})
export class LoanOfficerListComponent {
  loanApplications: LoanApplication[] = [];
  officerId: string = ''; // Default to an empty string
  displayedColumns: string[] = ['applicationId', 'userId', 'amountRequested', 'status', 'actions', 'viewDocuments'];

  constructor(
    private loanService: LoanService, // Use LoanService instead of LoanApplicationService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.officerId = this.getOfficerId(); // Get the officerId using the local method
    this.loadLoanApplications();
  }

  getOfficerId(): string {
    // Retrieve the officer ID from local storage
    const officerId = localStorage.getItem('userId');
    return officerId ? officerId : ''; // Return the officer ID if it exists, otherwise return an empty string
  }

  loadLoanApplications(): void {
    // Fetch loan applications assigned to the officer
    this.loanService.getLoanApplicationsByOfficerId(this.officerId).subscribe(
      (data: LoanApplication[]) => {
        this.loanApplications = data;
      },
      (error: any) => { // Explicitly typing the error as 'any'
        console.error('Error fetching loan applications:', error);
      }
    );
  }

  approveApplication(applicationId: string): void {
    // Logic to approve the application
    this.loanService.approveLoanApplication(applicationId).subscribe(
      (response) => {
        console.log('Application approved successfully:', response);
        this.loadLoanApplications(); // Refresh the list after approval
      },
      (error: any) => { // Explicitly typing the error as 'any'
        console.error('Error approving application:', error);
      }
    );
  }
  
  rejectApplication(applicationId: string): void {
    const remarks = prompt('Enter the remarks for rejecting the application:');
    if (remarks) {
      this.loanService.rejectLoanApplication(applicationId, remarks).subscribe(
        (response) => {
          console.log('Application rejected successfully:', response);
          this.loadLoanApplications(); // Refresh the list after rejection
        },
        (error: any) => {
          console.error('Error rejecting application:', error);
        }
      );
    }
  }

  viewDocuments(application: LoanApplication): void {
    // Logic to view documents, could open a modal or navigate to another route
    console.log('Navigating to view documents for application ID:', application.applicationId);
    this.router.navigate(['/view-documents', application.applicationId]); // Adjust the path as needed
  }

  logout(): void {
    // Logic to handle logout
    localStorage.removeItem('userId'); // Clear the user ID from local storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
