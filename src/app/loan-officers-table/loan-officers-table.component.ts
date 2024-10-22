import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-loan-officers-table',
  templateUrl: './loan-officers-table.component.html',
  styleUrl: './loan-officers-table.component.css'
})
export class LoanOfficersTableComponent {
  loanOfficers: any[] = [];
  filteredOfficers: any[] = [];  // To hold the filtered officers
  searchTerm: string = '';  // Two-way bound to the search bar
 
  private loanOfficerApiUrl = 'http://localhost:5099/api/LoanOfficer';
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 2;
 
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {
    this.fetchLoanOfficers();
  }
 
  fetchLoanOfficers() {
    this.http.get<any[]>(this.loanOfficerApiUrl).subscribe(
      data => {
        this.loanOfficers = data.sort((a, b) => a.loanOfficerId - b.loanOfficerId);
        this.filteredOfficers = this.loanOfficers; 
        this.totalPages = Math.ceil(this.filteredOfficers.length / this.itemsPerPage);
      },
      error => {
        console.error('Error fetching loan officers:', error);
      }
    );
  }
 
  // Method to filter the loan officers based on the search term
  filterOfficers() {
    this.filteredOfficers = this.loanOfficers.filter(officer =>
      officer.loName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      officer.loEmail.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      officer.loUserName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;  // Reset to the first page after filtering
    this.totalPages = Math.ceil(this.filteredOfficers.length / this.itemsPerPage);
  }
 
  // Updated pagination logic to use filtered officers
  getPaginatedOfficers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredOfficers.slice(startIndex, endIndex);
  }
 
  deleteLoanOfficer(officerId: number) {
    this.http.delete(`${this.loanOfficerApiUrl}/${officerId}`, {}).subscribe({
      next: () => {
        this.loanOfficers = this.loanOfficers.filter(officer => officer.loanOfficerId !== officerId);
        this.filterOfficers();  // Reapply the filter after deletion
      },
      error: (error) => {
        console.error('Error soft-deleting loan officer:', error);
      }
    });
  }
 
  goBack(): void {
    this.router.navigate(['/admin-dashboard']);
  }
 
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
 
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
 
  goToPage(page: number) {
    this.currentPage = page;
  }
}
