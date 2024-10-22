import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approved-loan',
  templateUrl: './approved-loan.component.html',
  styleUrl: './approved-loan.component.css'
})
export class ApprovedLoanComponent implements OnInit {

  approvedLoans: any[] = [];
  officerId: string | null = null;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch officer ID from localStorage
    this.officerId = localStorage.getItem('id');
    
    if (this.officerId) {
      // Call API to fetch approved loans
      const apiUrl = `http://localhost:5099/api/LoanOfficer/approvedLoanApplication?id=${this.officerId}`;
      
      this.http.get(apiUrl).subscribe(
        (data: any) => {
          this.approvedLoans = data;
        },
        error => {
          this.errorMessage = 'Failed to load approved loans. Please try again later.';
          console.error('Error:', error);
        }
      );
    } else {
      this.errorMessage = 'No officer ID found. Please log in again.';
    }
  }
}
