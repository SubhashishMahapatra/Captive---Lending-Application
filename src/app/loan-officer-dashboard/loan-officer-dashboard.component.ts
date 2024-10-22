import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplication } from '../modules/admin/components/loan-officer-list/model/loan-application.model';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-loan-officer-dashboard',
  templateUrl: './loan-officer-dashboard.component.html',
  styleUrl: './loan-officer-dashboard.component.css'
})
export class LoanOfficerDashboardComponent {
    
    loanApplications: LoanApplication[] = [];
    filteredApplications: LoanApplication[] = [];  // Filtered applications for search
    officerId: string = ''; 
    displayedColumns: string[] = ['applicationId', 'userId', 'amountRequested', 'status', 'actions', 'viewDocuments'];
  
    // Pagination variables
    currentPage = 1;
    itemsPerPage = 5;
    totalPages = 0;
  
    // Search variable
    searchTerm: string = '';
  
    constructor(
      private loanService: LoanService,
      private router: Router
    ) { }
  
    ngOnInit(): void {
      this.officerId = this.getOfficerId();
      this.loadLoanApplications();
    }
  
    getOfficerId(): string {
      const officerId = localStorage.getItem('id');
      return officerId ? officerId : '';
    }
  
    loadLoanApplications(): void {
      this.loanService.getLoanApplicationsByOfficerId(this.officerId).subscribe(
        (data: LoanApplication[]) => {
          this.loanApplications = data;
          this.filteredApplications = this.loanApplications;  // Initialize filteredApplications with all data
          this.totalPages = Math.ceil(this.filteredApplications.length / this.itemsPerPage);
        },
        (error: any) => {
          console.error('Error fetching loan applications:', error);
        }
      );
    }
  
    // Search functionality
    filterApplications(): void {
      this.filteredApplications = this.loanApplications.filter(application => {
        const loanApplicationId = application.loanApplicationId?.toString();
        const userId = application.userId ? application.userId.toString().toLowerCase() : '';  // Ensure it's a string
        const status = application.status?.toLowerCase() || '';
    
        return loanApplicationId.includes(this.searchTerm) ||
               userId.includes(this.searchTerm.toLowerCase()) ||
               status.includes(this.searchTerm.toLowerCase());
      });
    
      this.currentPage = 1;  // Reset to the first page after filtering
      this.totalPages = Math.ceil(this.filteredApplications.length / this.itemsPerPage);
    }
    
  
    // Pagination logic
    getPaginatedApplications(): LoanApplication[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredApplications.slice(startIndex, endIndex);
    }
  
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  
    approveApplication(applicationId: string): void {
      this.loanService.approveLoanApplication(applicationId).subscribe({
        next: (response) => {
          console.log('Application approved successfully:', response);
          this.loadLoanApplications();
        },
        error: (error: any) => {
          console.error('Error approving application:', error);
        }
      });
    }
  
    rejectApplication(applicationId: any): void {
      const remark = prompt('Enter the remarks for rejecting the application:');
      if (remark) {
        this.loanService.rejectLoanApplication(applicationId, remark).subscribe(
          (response) => {
            console.log('Application rejected successfully:', response);
            this.loadLoanApplications();
          },
          (error: any) => {
            console.error('Error rejecting application:', error);
          }
        );
      }
    }
  
    viewDocuments(application: LoanApplication): void {
      this.router.navigate(['/view-documents', application.loanApplicationId]);
    }
  
    logout(): void {
      localStorage.removeItem('id');
      this.router.navigate(['/login']);
    }
  }
  
