import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-track-payments',
  templateUrl: './track-payments.component.html',
  styleUrl: './track-payments.component.css'
})
export class TrackPaymentsComponent implements OnInit {
  approvedApplications: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.fetchApprovedApplications(userId);
    } else {
      this.errorMessage = 'User ID not found';
    }
  }

  fetchApprovedApplications(userId: string): void {
    this.applicationService.getApprovedApplicationsByUserId(userId).subscribe(
      (data) => {
        this.approvedApplications = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load approved applications';
        console.error('Error fetching approved applications', error);
      }
    );
  }

  // Method to navigate to the payment details of the selected application
  onViewPaymentDetails(applicationId: number): void {
    this.router.navigate(['/track-installment', applicationId]);
  }
}
