import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrl: './application-list.component.css'
})


export class ApplicationListComponent implements OnInit {

  applications: any[] = [];
  filteredApplications: any[] = []; // To store the filtered results for search
  errorMessage: string | null = null;
 
  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
 
  // Search variable
  searchTerm: string = '';
 
  constructor(private applicationService: ApplicationService, private router: Router) {}
 
  ngOnInit(): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.fetchApplications(userId);
    } else {
      this.errorMessage = 'User ID not found';
    }
  }
 
  fetchApplications(userId: string): void {
    this.applicationService.getApplicationsByUserId(userId).subscribe(
      (data) => {
        this.applications = data;
        this.filteredApplications = this.applications; // Initialize filteredApplications with all applications
        this.totalPages = Math.ceil(this.filteredApplications.length / this.itemsPerPage);
      },
      (error) => {
        this.errorMessage = 'Failed to load applications';
        console.error('Error fetching applications', error);
      }
    );
  }
 
  // Search functionality
  filterApplications(): void {
    this.filteredApplications = this.applications.filter(application =>
      application.loanApplicationId.toString().includes(this.searchTerm) ||
      application.accountNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      application.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1; // Reset to the first page after search
    this.totalPages = Math.ceil(this.filteredApplications.length / this.itemsPerPage);
  }
 
  // Pagination logic
  getPaginatedApplications(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredApplications.slice(startIndex, endIndex);
  }
 
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
 
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
 
  // Handle Make Payment Button click
  onMakePayment(applicationId: any): void {
    this.router.navigate(['/make-payment', applicationId]);
  }

  // Handle Pay EMI Button click
onPayEMI(applicationId: any): void {
  this.router.navigate(['/pay-emi', applicationId]);
}

// Handle PrePay Button click
onPrePay(applicationId: any): void {
  this.router.navigate(['/prepay', applicationId]);
}
}