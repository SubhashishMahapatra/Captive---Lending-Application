import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
 // Properties for loan calculator
 loanAmount: number = 500000;
 interestRate: number = 10;
 loanTenure: number = 36;
 monthlyPayment: number = 0;

 // Properties for loan offers
 loanOffers = [
   {
     title: "Quick Personal Loan",
     description: "Get instant approval for personal loans up to ₹5 lakhs with minimal documentation.",
     interestRate: "10.99%",
   },
   {
     title: "Home Renovation Loan",
     description: "Transform your home with our special renovation loan package. Low interest rates available.",
     interestRate: "8.75%",
   },
   {
     title: "Education Loan",
     description: "Invest in your future with our education loans. Flexible repayment options for students.",
     interestRate: "7.5%",
   },
 ];

 ngOnInit() {
   this.calculateEMI();
 }

 calculateEMI() {
   const principal = this.loanAmount;
   const ratePerMonth = this.interestRate / (12 * 100);
   const numberOfPayments = this.loanTenure;

   const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfPayments)) /
               (Math.pow(1 + ratePerMonth, numberOfPayments) - 1);

   this.monthlyPayment = Number(emi.toFixed(2));
 }

 onSliderChange() {
   this.calculateEMI();
 }
}
