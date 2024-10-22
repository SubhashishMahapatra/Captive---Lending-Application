import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  // Arrays to store fetched data
  loanOfficers: any[] = [];
  loanSchemes: any[] = [];
  retailLoans: any[] = [];
  corporateLoans: any[] = [];
  loanSchemeForm!: FormGroup;  // Define the form group
  isEditMode = false;  // Toggle for edit mode
  selectedLoanSchemeId: number = 0;
 
 
  // New properties for counts
  retailLoanCount: number = 0;
  corporateLoanCount: number = 0;
 
  // New properties for the bar chart
  barChart: any; // Chart.js instance
  barChartLabels: string[] = ['Retail Schemes', 'Corporate Schemes'];
  barChartData: number[] = [0, 0]; // Initialize with counts
 
 

  // API URLs
  private loanOfficerApiUrl = 'http://localhost:5099/api/Loanofficer';
  private loanSchemeApiUrl = 'http://localhost:5099/api/Loanscheme';
  private retailApiUrl = 'http://localhost:5099/retail';
  private corporateApiUrl = 'http://localhost:5099/corporate';


 
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService:AuthService

  ) {}

   // Listen to user activity (mouse movements, key presses, etc.)
   @HostListener('document:mousemove')
   @HostListener('document:keydown')
   @HostListener('document:click')
   resetSessionTimer() {
     this.authService.resetTimeout();
   }

   adminName = localStorage.getItem('name')
 
  ngOnInit() {
    // Initialize the form
    this.loanSchemeForm = this.fb.group({
      lsType: ['', Validators.required],
      lsName: ['', Validators.required],
      lsDescription: ['', Validators.required],
      rateOfInterest: [0, Validators.required],
      tenure: [0, Validators.required],
    });
 
    this.fetchLoanOfficers();
    this.fetchLoanSchemes();
    this.fetchRetailLoans();
    this.fetchCorporateLoans();
    this.createBarChart(); 
  }
 
  // Fetch loan officers
  fetchLoanOfficers() {
    this.http.get<any[]>(this.loanOfficerApiUrl).subscribe(
      data => {
        this.loanOfficers = data;
      },
      error => {
        console.error('Error fetching loan officers:', error);
      }
    );
  }
 
  // Fetch loan schemes
  fetchLoanSchemes() {
    this.http.get<any[]>(this.loanSchemeApiUrl).subscribe(
      data => {
        this.loanSchemes = data;
      },
      error => {
        console.error('Error fetching loan schemes:', error);
      }
    );
  }
 
  // Fetch retail loans
  fetchRetailLoans() {
    this.http.get<any[]>(this.retailApiUrl).subscribe(
      data => {
        this.retailLoans = data;
        this.retailLoanCount = data.length; // Get count of corporate loans
        this.updateBarChart(); // Update bar chart
      },
      error => {
        console.error('Error fetching retail loans:', error);
      }
    );
  }
 
  // Fetch corporate loans
  fetchCorporateLoans() {
    this.http.get<any[]>(this.corporateApiUrl).subscribe(
      data => {
        this.corporateLoans = data;
        this.corporateLoanCount = data.length; // Get count of corporate loans
        this.updateBarChart(); // Update bar chart

      },
      error => {
        console.error('Error fetching corporate loans:', error);
      }
    );
  }
 
  // Edit Loan Scheme
  editLoanScheme(loanScheme: any): void {
    this.isEditMode = true;
    this.selectedLoanSchemeId = loanScheme.loanSchemesId; // Store the selected loan scheme ID
    // Populate the form with the selected loan scheme data
    this.loanSchemeForm.patchValue({
      lsType: loanScheme.lsType,
      lsName: loanScheme.lsName,
      lsDescription: loanScheme.lsDescription,
      rateOfInterest: loanScheme.rateOfInterest,
      tenure: loanScheme.tenure
    });
  }

  editLoanScheme1(loanSchemeId: number): void {
    this.router.navigate([`/edit-loan-scheme/${loanSchemeId}`]);
  }
 
  // Submit the loan scheme
  submitLoanScheme(): void {
    if (this.loanSchemeForm.valid) {
      this.http.put(`${this.loanSchemeApiUrl}/${this.selectedLoanSchemeId}`, this.loanSchemeForm.value).subscribe(
        () => {
          this.isEditMode = false; // Exit edit mode
          this.fetchLoanSchemes(); // Refresh loan schemes list
        },
        error => {
          console.error('Error updating loan scheme:', error);
        }
      );
    }
  }
 
  // Delete Loan Scheme
  deleteLoanScheme(id: any): void {
    this.http.delete(`${this.loanSchemeApiUrl}/${id}`).subscribe({
      next: () => {
        this.fetchRetailLoans(); // Refresh the loan lists after deletion
        this.fetchCorporateLoans();

      },
      error: (error) => {
        console.error('Error deleting loan scheme:', error);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


    // Create Bar Chart
    createBarChart() {
      this.barChart = new Chart('barCanvas', {
        type: 'bar',
        data: {
          labels: this.barChartLabels,
          datasets: [{
            label: 'Loan Schemes Count',
            data: this.barChartData,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
            ],
            borderColor: [
              '#FF6384',
              '#36A2EB',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
   
    updateBarChart() {
      this.barChart.data.datasets[0].data = [this.retailLoanCount, this.corporateLoanCount];
      this.barChart.update(); // Refresh the chart
    }
}