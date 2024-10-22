import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';

declare var paypal: any;

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrl: './make-payment.component.css'
})
export class MakePaymentComponent implements OnInit, AfterViewInit{

  applicationId: any | null = null;
  paymentAmount: any = 0;
  errorMessage: string | null = null;
  successMessage: string | null = null;  // Add this line
  transactionInProgress: boolean = false;


  constructor(private route: ActivatedRoute, private applicationService: ApplicationService ,private router : Router) { }

  ngOnInit(): void {
    // Get the application ID from the route
    this.applicationId = Number(this.route.snapshot.paramMap.get('applicationId'));
  }

    // Use ngAfterViewInit to ensure the DOM is fully loaded before rendering the PayPal button
    ngAfterViewInit(): void {
      this.initPayPalButton();
    }

    initPayPalButton(): void {
      if (document.getElementById('paypal-button-container')) {
        paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: this.paymentAmount.toString()  // Convert amount to string for PayPal
                }
              }]
            });
          },
          onApprove: (data: any, actions: any) => {
            this.transactionInProgress = true;  // Show transaction progress message
            return actions.order.capture().then((details: any) => {
              console.log('Transaction completed by ' + details.payer.name.given_name);
   
              // Call backend to submit the repayment
              this.submitPayment();
            });
          },
          onCancel: (data: any) => {
            console.log('Transaction was canceled.');
            this.transactionInProgress = false;
          },
          onError: (err: any) => {
            console.error('Error during the transaction', err);
            this.transactionInProgress = false;
          }
        }).render('#paypal-button-container'); // Ensure the element exists before rendering
      } else {
        console.error('PayPal button container not found');
      }
    }

  

  submitPayment() {
    if (this.applicationId && this.paymentAmount > 0) {
      this.applicationService.makePayment(this.applicationId, this.paymentAmount).subscribe(
        (response) => {
          this.successMessage = 'Payment successful!';  // Set success message
          this.errorMessage = null;  // Clear any previous error messages
          // Optionally, navigate back to the application list
        },
        (error) => {
          this.errorMessage = 'Payment failed';
          this.successMessage = null;  // Clear any previous success messages
          console.error('Error making payment', error);
        }
      );
    } else {
      this.errorMessage = 'Invalid payment amount';
      this.successMessage = null;  // Clear any previous success messages
    }
    
  }

  trackPayments() {
    if (this.applicationId) {
      this.router.navigate(['/track-payments', this.applicationId]);
    }
  }
}
