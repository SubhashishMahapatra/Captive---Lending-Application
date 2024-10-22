import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rejected-loan',
  templateUrl: './rejected-loan.component.html',
  styleUrl: './rejected-loan.component.css'
})
export class RejectedLoanComponent implements OnInit {
  rejectedLoans: any[] = [];
  errorMessage: string | null = null;
  loanOfficerId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Get the loan officer ID from localStorage
    this.loanOfficerId = localStorage.getItem('id');
    
    if (this.loanOfficerId) {
      // Replace the API endpoint URL with your actual endpoint
      const apiUrl = `http://localhost:5099/api/LoanOfficer/rejectedLoanApplication?id=${this.loanOfficerId}`;
      
      this.http.get<any[]>(apiUrl).subscribe(
        data => {
          this.rejectedLoans = data;
        },
        error => {
          this.errorMessage = 'Failed to load rejected loans. Please try again later.';
          console.error('Error:', error);
        }
      );
    } else {
      this.errorMessage = 'Loan officer ID not found in local storage.';
    }
  }
}
