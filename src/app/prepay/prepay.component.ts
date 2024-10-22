import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';

declare var paypal: any;

@Component({
  selector: 'app-prepay',
  templateUrl: './prepay.component.html',
  styleUrls: ['./prepay.component.css']
})
export class PrepayComponent implements OnInit, AfterViewInit {
  applicationId: string | null = null;
  prePaymentAmount: number = 0; // Pre-payment amount input
  transactionInProgress: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(): void {
    this.initPayPalButton(); // Initialize PayPal button on view init
  }

  // Method to initiate the pre-payment process
  initiatePrePay(): void {
    if (this.prePaymentAmount <= 0) {
      this.errorMessage = 'Please enter a valid amount.';
      return;
    }
    this.submitPrePayment();
    this.transactionInProgress = true; // Start the transaction
    this.initPayPalButton(); // Initialize PayPal button
  }

  // Initialize PayPal button
  initPayPalButton(): void {
    if (document.getElementById('paypal-button-container')) {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.prePaymentAmount.toString() // Convert amount to string for PayPal
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          this.transactionInProgress = true; // Show transaction progress message
          return actions.order.capture().then((details: any) => {
            console.log('Transaction completed by ' + details.payer.name.given_name);
            // Call backend to submit the prepayment
            this.submitPrePayment();
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

  // Method to submit prepayment
  submitPrePayment(): void {
    if (this.applicationId && this.prePaymentAmount > 0) {
      this.applicationService.prePay(this.applicationId, this.prePaymentAmount).subscribe(
        (response) => {
          this.successMessage = 'PrePayment successful!'; // Set success message
          this.errorMessage = null; // Clear any previous error messages
          this.transactionInProgress = false; // Hide transaction progress
          this.router.navigate(['/application-list']); // Redirect after payment
        },
        (error) => {
          this.errorMessage = 'PrePayment failed. Please try again.';
          this.successMessage = null; // Clear any previous success messages
          this.transactionInProgress = false; // Hide transaction progress
          console.error('Error making prepayment', error);
        }
      );
    } else {
      this.errorMessage = 'Invalid payment amount';
      this.successMessage = null; // Clear any previous success messages
    }
  }
}
