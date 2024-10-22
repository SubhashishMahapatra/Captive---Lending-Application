import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-loan-officer',
  templateUrl: './add-loan-officer.component.html',
  styleUrl: './add-loan-officer.component.css'
})
export class AddLoanOfficerComponent {
  loanOfficer = {
    LOEmail: '',
    LOName: '',
    LOUserName: '',
    Password: ''
  };
 
  private apiUrl = 'http://localhost:5099/api/LoanOfficer';
 
  constructor(private http: HttpClient, private router: Router) {}
 
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.postLoanOfficer();
    } else {
      console.log('Form is invalid');
    }
  }
 
  postLoanOfficer() {
    this.http.post(this.apiUrl, this.loanOfficer)
      .subscribe({
        next: (response: any) => {
          console.log('Loan officer added successfully!', response);
          alert('Loan officer added successfully!');
          // Navigate to admin dashboard after successful submission
          this.router.navigate(['/admin-dashboard']); // Adjust this route as necessary
        },
        error: (error: any) => {
          console.error('Error adding loan officer', error);
        }
      });
  }
  cancel() {
    this.router.navigate(['/admin-dashboard']);
  }
}
