import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'; // Import XLSX for Excel export
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-loan-distribution-chart',
  templateUrl: './loan-distribution-chart.component.html',
  styleUrls: ['./loan-distribution-chart.component.css']
})
export class LoanDistributionChartComponent implements AfterViewInit {
  private loanTypes: any = {};
  private loanStatus: any = {};
  private officerCounts: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit(): void {
    this.fetchLoanApplications();
    this.fetchLoanOfficers();
  }

  fetchLoanApplications(): void {
    this.http.get('http://localhost:5099/api/LoanApplication').subscribe((data: any) => {
      this.loanTypes = this.processData(data);
      this.renderChart(this.loanTypes);
      this.loanStatus = this.processStatus(data);
      this.renderStatusChart(this.loanStatus);
    });
  }

  processData(applications: any[]): any {
    const loanTypesCount: { [key: string]: number } = {};
    applications.forEach(app => {
      const loanType = app.loanType || 'Loan Applications'; // Default label if undefined
      if (loanTypesCount[loanType]) {
        loanTypesCount[loanType]++;
      } else {
        loanTypesCount[loanType] = 1;
      }
    });
    return loanTypesCount;
  }

  processStatus(applications: any[]): any {
    const statusCount: { [key: string]: number } = { Approved: 0, Rejected: 0 };
    applications.forEach(app => {
      const status = app.status;
      if (status === 'approved') {
        statusCount['Approved']++;
      } else if (status === 'rejected') {
        statusCount['Rejected']++;
      }
    });
    return statusCount;
  }

  renderChart(loanTypes: any): void {
    const ctx = (document.getElementById('loanApplicationsChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(loanTypes),
          datasets: [{ data: Object.values(loanTypes), backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }],
        },
        options: { responsive: true }
      });
    }
  }

  renderStatusChart(status: any): void {
    const ctx = (document.getElementById('loanStatusChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(status),
          datasets: [{ label: 'Loan Status', data: Object.values(status), backgroundColor: ['#4BC0C0', '#FF6384'] }],
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
      });
    }
  }

  fetchLoanOfficers(): void {
    this.http.get('http://localhost:5099/api/LoanOfficer').subscribe((activeData: any) => {
      this.http.get('http://localhost:5099/Inactive').subscribe((inactiveData: any) => {
        const allOfficers = [...activeData, ...inactiveData];
        this.officerCounts = this.processOfficerData(activeData.length, inactiveData.length);
        this.renderOfficerChart(this.officerCounts);
      });
    });
  }

  processOfficerData(activeCount: number, inactiveCount: number): any {
    return { Active: activeCount, Inactive: inactiveCount };
  }

  renderOfficerChart(officerCounts: any): void {
    const ctx = (document.getElementById('loanOfficersChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(officerCounts),
          datasets: [{ label: 'Loan Officers', data: Object.values(officerCounts), backgroundColor: ['#36A2EB', '#FF6384'] }],
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
      });
    }
  }

  // Excel Download Function
  downloadExcel(): void {
    const wb = XLSX.utils.book_new();

    // Add data to the Excel sheets
    const loanTypesSheet = XLSX.utils.json_to_sheet([this.loanTypes]);
    XLSX.utils.book_append_sheet(wb, loanTypesSheet, 'Loan Applications Breakdown');

    const loanStatusSheet = XLSX.utils.json_to_sheet([this.loanStatus]);
    XLSX.utils.book_append_sheet(wb, loanStatusSheet, 'Loan Applications Status');

    const officerCountsSheet = XLSX.utils.json_to_sheet([this.officerCounts]);
    XLSX.utils.book_append_sheet(wb, officerCountsSheet, 'Loan Officers Breakdown');

    // Write the Excel file and prompt for download
    XLSX.writeFile(wb, 'Loan_Report.xlsx');
  }

  goBack(): void {
    this.router.navigate(['/admin-dashboard']);
  }
}
