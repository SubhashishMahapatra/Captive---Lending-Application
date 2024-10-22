import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { animate } from '@angular/animations';

@Component({
  selector: 'app-track-installment',
  templateUrl: './track-installment.component.html',
  styleUrl: './track-installment.component.css'
})
export class TrackInstallmentComponent implements OnInit{
  paymentLogs: any[] = [];
  errorMessage: string | null = null;
  applicationId: number | null = null;

  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the applicationId from the route parameters
    this.route.paramMap.subscribe(params => {
      const id = params.get('applicationId');
      console.log("Application Id: ",id);
      
      if (id) {
        // this.applicationId = +id; // Convert the string to a number
        this.fetchPaymentLogs(id);
        console.log("Application Id:",id);
        
      } else {
        this.errorMessage = 'Application ID not provided';
      }
    });
  }

  fetchPaymentLogs(applicationId: any): void {
    this.applicationService.getPaymentLogs(applicationId).subscribe(
      (data) => {
        this.paymentLogs = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load payment logs';
        console.error('Error fetching payment logs', error);
      }
    );
  }
}
