import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-officer-profile',
  templateUrl: './loan-officer-profile.component.html',
  styleUrl: './loan-officer-profile.component.css'
})
export class LoanOfficerProfileComponent implements OnInit{

  loanOfficerId: string | null = null;
  loanOfficer: LoanOfficer | null = null; // Loan officer data

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Get loan officer ID from localStorage
    this.loanOfficerId = localStorage.getItem('id');
    if (this.loanOfficerId) {
      this.getLoanOfficerDetails(this.loanOfficerId);
    }
  }

  // Fetch loan officer details from the API
  getLoanOfficerDetails(loanOfficerId: string): void {
    const apiUrl = `http://localhost:5099/api/LoanOfficer/${loanOfficerId}`;
    this.http.get<LoanOfficer>(apiUrl).subscribe(
      (data) => {
        this.loanOfficer = data;
      },
      (error) => {
        console.error('Error fetching loan officer data', error);
      }
    );
  }

  // Update loan officer details via PUT request
  updateLoanOfficerDetails(): void {
    if (this.loanOfficer && this.loanOfficerId) {
      const apiUrl = `http://localhost:5099/api/LoanOfficer/${this.loanOfficerId}`;
      this.http.put(apiUrl, this.loanOfficer).subscribe(
        (response) => {
          console.log('Loan officer updated successfully', response);
        },
        (error) => {
          console.error('Error updating loan officer', error);
        }
      );
    }
  }
}

export interface LoanOfficer {
  loEmail: string;
  loName: string;
  loUserName: string;
  password: string;
}

