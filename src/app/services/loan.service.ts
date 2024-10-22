import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollateralDocument, LoanApplication, PersonalDocument } from '../modules/admin/components/loan-officer-list/model/loan-application.model';
import { LoanScheme } from '../modules/admin/components/loan-officer-list/model/loan-scheme-model';
import { LoanRepayment } from '../modules/admin/components/loan-officer-list/model/loan-repayment.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private apiUrl = 'http://localhost:5099/api/LoanScheme'; 
  private applicationUrl = 'http://localhost:5099/api/LoanApplication/apply';
  private officerApplicationsUrl = 'http://localhost:5099/api/LoanApplication';
  private repaymentUrl = 'http://localhost:5099/api/Repayment';
  private approveUrl = 'http://localhost:5099/api/ApplicationStatus'

  constructor(private http: HttpClient) {}

  // Method to get loan schemes by type (0 for Retail, 1 for Corporate)
  getLoanSchemesByType(type: number): Observable<LoanScheme[]> {
    return this.http.get<LoanScheme[]>(`${this.apiUrl}/ByType?loanType=${type}`);
  }

  // applyForLoan(loanData: any): Observable<any> {
  //   return this.http.post(`${this.applicationUrl}/apply`, loanData);
  // }

  // Submit loan application
  submitLoanApplication(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.applicationUrl}`, formData);
  }

  // Method to get loan applications assigned to a specific officer
  getLoanApplicationsByOfficerId(officerId: any): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(`${this.officerApplicationsUrl}/officer/${officerId}`);
}

getPersonalDocumentsByApplicationId(applicationId: string): Observable<PersonalDocument[]> {
  console.log("Application ID:", applicationId); // Debugging line
  return this.http.get<PersonalDocument[]>(`http://localhost:5099/api/LoanApplication/applicationDocument?id=${applicationId}`);
}

getCollateralDocumentsByApplicationId(applicationId: any): Observable<CollateralDocument[]> {
  console.log("Application ID:", applicationId); // Debugging line
  return this.http.get<CollateralDocument[]>(`http://localhost:5099/api/LoanApplication/${applicationId}/collateral-documents
`);
}

approvePersonalDocumentByApplicationId(applicationId: any) {
  return this.http.put(`http://localhost:5099/api/ApplicationStatus/approvePersonalDocs/${applicationId}`, {},{responseType:'text'});
}

approveCollateralDocumentByApplicationId(applicationId: any) {
  return this.http.put(`http://localhost:5099/api/ApplicationStatus/approveCollateralDocs/${applicationId}`, {}, {responseType:'text'});
}


approveLoanApplication(applicationId: any): Observable<any> {
  return this.http.post(`${this.approveUrl}/approve/${applicationId}`, {});
}

// rejectLoanApplication(applicationId: any, remarks: string): Observable<any> {
//   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//   // const body = JSON.stringify({ remarks }); // Wrap the remarks in an object
//   console.log(typeof(remarks), `"${remarks}"`);
  
//   return this.http.post(`http://localhost:5099/api/ApplicationStatus/reject/${applicationId}`, `"${remarks}"`);
// }

rejectLoanApplication(applicationId: string, remark: string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const body = `"${remark}"` // Wrap the remarks in an object
  return this.http.put(`http://localhost:5099/api/ApplicationStatus/reject/${applicationId}`, body, { headers });
}




getUserApplications(userId: string): Observable<LoanApplication[]> {
  return this.http.get<LoanApplication[]>(`${this.officerApplicationsUrl}/user/${userId}/applications`);
}

// Method to upload collateral documents
uploadCollateralDocuments(applicationId: string, formData: FormData): Observable<any> {
  return this.http.post(`${this.officerApplicationsUrl}/${applicationId}/uploadCollateral`, formData);
}

getApprovedApplications(userId: string) {
  // Call the track endpoint instead of approved, as per your backend setup
  return this.http.get<any[]>(`${this.officerApplicationsUrl}/track/${userId}`); 
}

getRepayments(): Observable<LoanRepayment[]> {
  return this.http.get<LoanRepayment[]>(this.repaymentUrl); 
}


makePayment(applicationId: string, paymentAmount: number): Observable<any> {
  // Updated API endpoint to match the new route
  const url = `${this.repaymentUrl}/pay/application/${applicationId}/payment`;

  // Sending payment amount directly as it is expected in the request body
  return this.http.post(url, paymentAmount);
}

getUserLoanApplications(userId: string): Observable<LoanApplication[]> {
  return this.http.get<LoanApplication[]>(`${this.repaymentUrl}/user/${userId}`); 
}

triggerRepayment(applicationId: string): Observable<any> {
  return this.http.post(`http://localhost:5099/api/Repayments/${applicationId}`, {});
}

}
