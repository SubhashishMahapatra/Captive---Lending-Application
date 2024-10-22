import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApplyLoanApplicationService {
  private apiUrl = 'http://localhost:5099/api/LoanApplication'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Make sure to observe the full response to access status codes
  submitLoanApplication(loanApplication: any) {
    return this.http.post(this.apiUrl , loanApplication, { observe: 'response' });
  }
}
