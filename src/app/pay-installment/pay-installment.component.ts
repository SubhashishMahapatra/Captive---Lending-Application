import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-installment',
  templateUrl: './pay-installment.component.html',
  styleUrl: './pay-installment.component.css'
})
export class PayInstallmentComponent implements OnInit{
  approvedApplications: any[] = [];
  userId: any;

  constructor(private http: HttpClient, private router:Router) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.getApprovedApplications();
  }

  getApprovedApplications(): void {
    this.http.get<any[]>(`http://localhost:5099/approvedApplication/${this.userId}`)
      .subscribe(
        (response) => {
          this.approvedApplications = response;
        },
        (error) => {
          console.error('Error fetching approved applications', error);
        }
      );
  }

  payInstallment(loanApplicationId: any): void {
    // Logic to pay installment for the selected application
    console.log('Pay installment for application:', );
    this.router.navigate([`/pay-emi/${loanApplicationId}`])
    
  }
}


// onMakePayment(applicationId: any): void {
//   this.router.navigate(['/make-payment', applicationId]);
// }onMakePayment(app.loanApplicationId)make-payment/:applicationId
