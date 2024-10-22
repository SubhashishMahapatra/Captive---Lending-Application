import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = 'http://localhost:5099/api/LoanApplication'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Fetch applications by user ID
  getApplicationsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  // getLoanSchemeNameById(schemeId:number): Observable<any>{
  //   return this.http.get(`http://localhost:5099/GetloanSchemeById?id=/${schemeId}`);
  // }

  getLoanSchemeById(loanSchemeId: number): Observable<any>{
    return this.http.get(`http://localhost:5099/GetloanSchemeById?id=${loanSchemeId}`)
  }
  // makePayment(applicationId: any, paymentAmount: any) {
  //   return this.http.post(`http://localhost:5099/api/Repayments/pay/${applicationId}`,  paymentAmount );
    
  // }
  makePayment(applicationId: any, paymentAmount: any) {
    return this.http.post(`http://localhost:5099/api/Repayments/pay/${applicationId}`, paymentAmount, {
      responseType: 'text' // Specify the response type
    });
  }

  getRepayments(applicationId: any) {
    return this.http.get<any[]>(`http://localhost:5099/api/Repayments/?id=${applicationId}`);
  }

  payEMI(applicationId: string, amount: number) {
    return this.http.post(`http://localhost:5099/api/Repayment/${applicationId}/pay-emi`,  amount, { observe: 'response' } );
  }

  prePay(applicationId: any, amount: number) {
    return this.http.post(`http://localhost:5099/api/Repayment/${applicationId}/prepay`, amount , { observe: 'response' });
  }
  

  getPaymentLogs(applicationId: number) {
    return this.http.get<any[]>(`http://localhost:5099/api/Repayment/${applicationId}/GetList`);
  }

  getApprovedApplicationsByUserId(userId: string) {
    return this.http.get<any[]>(`http://localhost:5099/approvedApplication/${userId}`);
  }

  getEMIAmount(applicationId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5099/api/Repayment/${applicationId}/GetEMIamount`);
  }

  
}
