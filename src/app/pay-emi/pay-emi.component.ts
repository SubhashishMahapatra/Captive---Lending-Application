import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';

declare var paypal: any;

@Component({
  selector: 'app-pay-emi',
  templateUrl: './pay-emi.component.html',
  styleUrls: ['./pay-emi.component.css']
})
export class PayEmiComponent implements OnInit, AfterViewInit {
  applicationId: string | null = null;
  emiAmount: number = 0; // Store the EMI amount fetched from the API
  errorMessage: string | null = null;
  successMessage: string | null = null;
  transactionInProgress: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.paramMap.get('id');
    this.getEMIAmount(); // Fetch the EMI amount on component initialization
  }

  ngAfterViewInit(): void {
    this.initPayPalButton();
  }

  // Fetch the EMI amount from the API
  getEMIAmount(): void {
    if (this.applicationId) {
      this.applicationService.getEMIAmount(this.applicationId).subscribe(
        (response) => {
          this.emiAmount = response; // Adjust based on your API response structure
          console.log(response);
          
        },
        (error) => {
          console.error('Error fetching EMI amount', error);
          this.errorMessage = 'Failed to fetch EMI amount.';
        }
      );
    }
  }

  initPayPalButton(): void {
    if (document.getElementById('paypal-button-container')) {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.emiAmount.toString() // Use the fetched EMI amount
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          this.transactionInProgress = true;
          return actions.order.capture().then((details: any) => {
            console.log('Transaction completed by ' + details.payer.name.given_name);
            this.onPay(); // Call the backend method
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
      }).render('#paypal-button-container');
    } else {
      console.error('PayPal button container not found');
    }
  }

  onPay(): void {
    if (this.applicationId && this.emiAmount > 0) {
      this.applicationService.payEMI(this.applicationId, this.emiAmount).subscribe(
        (response: any) => {
          this.successMessage = 'Payment successful!';
          this.errorMessage = null;
          this.router.navigate(['/application-list']);
        },
        (error) => {
          this.errorMessage = 'Payment failed. Please try again.';
          console.error('Payment failed', error);
        }
      );
    } else {
      this.errorMessage = 'Invalid payment amount.';
    }
  }
}
