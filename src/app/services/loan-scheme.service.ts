import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanSchemeService {
  private apiUrl = 'http://localhost:5099/api/loan-schemes'; // Adjust the URL according to your API

  constructor(private http: HttpClient) {}

  getLoanSchemes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}