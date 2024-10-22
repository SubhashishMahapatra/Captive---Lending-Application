import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-loan-schemes-table',
  templateUrl: './loan-schemes-table.component.html',
  styleUrl: './loan-schemes-table.component.css'
})
export class LoanSchemesTableComponent {
 
  retailLoans: any[] = [];
  corporateLoans: any[] = [];
 

  filteredRetailLoans: any[] = [];
  filteredCorporateLoans: any[] = [];
  searchTermRetail: string = '';
  searchTermCorporate: string = '';
 
 
  currentPageRetail = 1;
  currentPageCorporate = 1;
  itemsPerPage = 5;
  totalPagesRetail = 1;
  totalPagesCorporate = 1;
 
  
  private retailApiUrl = 'http://localhost:5099/retail';
  private corporateApiUrl = 'http://localhost:5099/corporate';
 
  constructor(private http: HttpClient, private router: Router) {}
 
  ngOnInit() {
    this.fetchRetailLoans();
    this.fetchCorporateLoans();
  }
 
  
  fetchRetailLoans() {
    this.http.get<any[]>(this.retailApiUrl).subscribe(
      data => {
        this.retailLoans = data;
        this.filteredRetailLoans = this.retailLoans; // Initialize filtered data
        this.totalPagesRetail = Math.ceil(this.filteredRetailLoans.length / this.itemsPerPage);
      },
      error => {
        console.error('Error fetching retail loans:', error);
      }
    );
  }
 
 
  fetchCorporateLoans() {
    this.http.get<any[]>(this.corporateApiUrl).subscribe(
      data => {
        this.corporateLoans = data;
        this.filteredCorporateLoans = this.corporateLoans; // Initialize filtered data
        this.totalPagesCorporate = Math.ceil(this.filteredCorporateLoans.length / this.itemsPerPage);
      },
      error => {
        console.error('Error fetching corporate loans:', error);
      }
    );
  }
 
  // Filter retail loans based on search term
  filterRetailLoans() {
    this.filteredRetailLoans = this.retailLoans.filter(loan =>
      loan.lsName.toLowerCase().includes(this.searchTermRetail.toLowerCase()) ||
      loan.lsDescription.toLowerCase().includes(this.searchTermRetail.toLowerCase())
    );
    this.currentPageRetail = 1;  // Reset to the first page after filtering
    this.totalPagesRetail = Math.ceil(this.filteredRetailLoans.length / this.itemsPerPage);
  }
 
  // Filter corporate loans based on search term
  filterCorporateLoans() {
    this.filteredCorporateLoans = this.corporateLoans.filter(loan =>
      loan.lsName.toLowerCase().includes(this.searchTermCorporate.toLowerCase()) ||
      loan.lsDescription.toLowerCase().includes(this.searchTermCorporate.toLowerCase()) ||
      loan.interestRate.toLowerCase().includes(this.searchTermCorporate.toLowerCase())

    );
    this.currentPageCorporate = 1;  // Reset to the first page after filtering
    this.totalPagesCorporate = Math.ceil(this.filteredCorporateLoans.length / this.itemsPerPage);
  }
 
  // Pagination logic for retail loans
  getPaginatedRetailLoans() {
    const startIndex = (this.currentPageRetail - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredRetailLoans.slice(startIndex, endIndex);
  }
 
  // Pagination logic for corporate loans
  getPaginatedCorporateLoans() {
    const startIndex = (this.currentPageCorporate - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCorporateLoans.slice(startIndex, endIndex);
  }
 
  // Method to delete a retail loan scheme
  deleteLoanScheme(loanSchemeId: number) {
    this.http.delete(`http://localhost:5099/api/LoanScheme/${loanSchemeId}`).subscribe({
      next: () => {
        this.retailLoans = this.retailLoans.filter(loan => loan.loanSchemesId !== loanSchemeId);
        this.filterRetailLoans();
      },
      error: (error) => {
        console.error('Error deleting retail loan scheme:', error);
      }
    });
  }

 
 

  deleteCorporateLoanScheme(loanSchemeId: number) {
    this.http.delete(`http://localhost:5099/api/LoanScheme/${loanSchemeId}`).subscribe({
      next: () => {
        this.corporateLoans = this.corporateLoans.filter(loan => loan.loanSchemesId !== loanSchemeId);
        console.log('scheme id',loanSchemeId);
        
        this.filterCorporateLoans(); 
      },
      error: (error) => {
        console.error('Error deleting corporate loan scheme:', error);
      }
    });
  }

 
 
  goBack(): void {
    this.router.navigate(['/admin-dashboard']);
  }
 
  // Pagination navigation methods for retail loans
  prevPageRetail() {
    if (this.currentPageRetail > 1) this.currentPageRetail--;
  }
 
  nextPageRetail() {
    if (this.currentPageRetail < this.totalPagesRetail) this.currentPageRetail++;
  }
 
  goToPageRetail(page: number) {
    this.currentPageRetail = page;
  }
 
  // Pagination navigation methods for corporate loans
  prevPageCorporate() {
    if (this.currentPageCorporate > 1) this.currentPageCorporate--;
  }
 
  nextPageCorporate() {
    if (this.currentPageCorporate < this.totalPagesCorporate) this.currentPageCorporate++;
  }
 
  goToPageCorporate(page: number) {
    this.currentPageCorporate = page;
  }
}
