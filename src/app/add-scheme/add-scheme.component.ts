import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-scheme',
  templateUrl: './add-scheme.component.html',
  styleUrl: './add-scheme.component.css'
})
export class AddSchemeComponent {
  loanScheme = {
    LSType: '',
    LSName: '',
    LSDescription: '',
    RateOfInterest: null,
    Tenure: null  // Add Tenure field here
  };
 
  isLoading: boolean = false; 
  private apiUrl = 'http://localhost:5099/api/LoanScheme'; // Your API endpoint
 
  constructor(private http: HttpClient, private router: Router) {}
 
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.postLoanScheme();
    }
  }
 
  postLoanScheme() {
    this.isLoading = true;  // Start the loader
    this.http.post<HttpResponse<any>>(this.apiUrl, this.loanScheme, { observe: 'response' })
      .subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status === 200 || response.status === 201) {
            console.log('Loan scheme added successfully!', response);
            alert("Loan Scheme Added Successfully!!");
            this.router.navigate(['/admin-dashboard']);  // Redirect after successful submission
          } else {
            console.error('Unexpected response status:', response.status);
            alert('Unexpected response from the server.');
          }
          this.isLoading = false;  // Stop the loader
        },
        error: (error) => {
          console.error('Error adding loan scheme', error);
          alert('Failed to add loan scheme. Please try again.');
          this.isLoading = false;  // Stop the loader
        }
      });
  }

  cancel() {
    this.router.navigate(['/admin-dashboard']);
  }
}
