import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-scheme',
  templateUrl: './loan-scheme.component.html',
  styleUrls: ['./loan-scheme.component.css']
})
export class LoanSchemeComponent {

  retailLoans: any[] = [];
  corporateLoans: any[] = [];
  paginatedRetailLoans: any[] = [];
  paginatedCorporateLoans: any[] = [];
  searchRetail: string = '';
  searchCorporate: string = '';
 
  currentRetailPage: number = 1;
  currentCorporatePage: number = 1;
  itemsPerPage: number = 4;
 
  totalRetailPages: number = 0;
  totalCorporatePages: number = 0;
 
  constructor(private http: HttpClient, private router: Router) { }
 
  ngOnInit(): void {
    this.getRetailLoans();
    this.getCorporateLoans();
  }
 
  getRetailLoans(): void {
    this.http.get('http://localhost:5099/retail').subscribe(
      (data: any) => {
        this.retailLoans = data;
        this.filterLoans(); // Call to initialize filtered data
      },
      (error) => {
        console.error('Error fetching retail loans', error);
      }
    );
  }
 
  getCorporateLoans(): void {
    this.http.get('http://localhost:5099/corporate').subscribe(
      (data: any) => {
        this.corporateLoans = data;
        this.filterLoans(); // Call to initialize filtered data
      },
      (error) => {
        console.error('Error fetching corporate loans', error);
      }
    );
  }
 
  applyForLoan(loanSchemesId: number): void {
    this.router.navigate(['/apply-loan'], { queryParams: { loanSchemesId } });
  }
 
  public filterLoans(): void {
    const filteredRetailLoans = this.retailLoans.filter(loan =>
      loan.lsName.toLowerCase().includes(this.searchRetail.toLowerCase()) ||
      loan.lsDescription.toLowerCase().includes(this.searchRetail.toLowerCase())
    );
 
    const filteredCorporateLoans = this.corporateLoans.filter(loan =>
      loan.lsName.toLowerCase().includes(this.searchCorporate.toLowerCase()) ||
      loan.lsDescription.toLowerCase().includes(this.searchCorporate.toLowerCase())
    );
 
    this.totalRetailPages = Math.ceil(filteredRetailLoans.length / this.itemsPerPage);
    this.totalCorporatePages = Math.ceil(filteredCorporateLoans.length / this.itemsPerPage);
 
    this.paginateLoans(filteredRetailLoans, filteredCorporateLoans);
  }
 
  private paginateLoans(filteredRetailLoans: any[], filteredCorporateLoans: any[]): void {
    const startRetailIndex = (this.currentRetailPage - 1) * this.itemsPerPage;
    const endRetailIndex = startRetailIndex + this.itemsPerPage;
    this.paginatedRetailLoans = filteredRetailLoans.slice(startRetailIndex, endRetailIndex);
 
    const startCorporateIndex = (this.currentCorporatePage - 1) * this.itemsPerPage;
    const endCorporateIndex = startCorporateIndex + this.itemsPerPage;
    this.paginatedCorporateLoans = filteredCorporateLoans.slice(startCorporateIndex, endCorporateIndex);
  }
 
  prevRetailPage(): void {
    if (this.currentRetailPage > 1) {
      this.currentRetailPage--;
      this.filterLoans();
    }
  }
 
  nextRetailPage(): void {
    if (this.currentRetailPage < this.totalRetailPages) {
      this.currentRetailPage++;
      this.filterLoans();
    }
  }
 
  prevCorporatePage(): void {
    if (this.currentCorporatePage > 1) {
      this.currentCorporatePage--;
      this.filterLoans();
    }
  }
 
  nextCorporatePage(): void {
    if (this.currentCorporatePage < this.totalCorporatePages) {
      this.currentCorporatePage++;
      this.filterLoans();
    }
  }



  
}
