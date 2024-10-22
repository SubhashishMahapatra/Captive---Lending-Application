import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollateralDocument, PersonalDocument } from '../modules/admin/components/loan-officer-list/model/loan-application.model';
import { LoanService } from '../services/loan.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css']
})
export class ViewDocumentsComponent implements OnInit {
  applicationId: string | null = null;
  personalDocuments: PersonalDocument[] = [];
  collateralDocuments: CollateralDocument[] = []; 
  successMessage: string = ''; // Add this line to hold success messages
  errorMessage: string = ''; // Add this line to hold error messages

  constructor(
    private route: ActivatedRoute,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.paramMap.get('applicationId');

    if (this.applicationId) {
      this.loadDocuments();
    } else {
      console.error('Application ID is missing from the route');
    }
  }

  loadDocuments(): void {
    if (!this.applicationId) return;

    this.loanService.getPersonalDocumentsByApplicationId(this.applicationId).subscribe(
      (documents: PersonalDocument[]) => {
        this.personalDocuments = documents;
      },
      (error: any) => {
        console.error('Error fetching personal documents:', error);
      }
    );

    this.loanService.getCollateralDocumentsByApplicationId(this.applicationId).subscribe(
      (documents: CollateralDocument[]) => {
        this.collateralDocuments = documents;
      },
      (error: any) => {
        console.error('Error fetching collateral documents:', error);
      }
    );
  }

  approvePersonalDocument(applicationId: any): void {
    if (!this.applicationId) return;

    this.loanService.approvePersonalDocumentByApplicationId(applicationId).subscribe(
      (response: any) => {
        if (true) {
          this.successMessage = "Personal Document Approved Successfully"; // Set success message
          console.log("Personal Loan Approved");
        } else {
          this.errorMessage = "Failed to approve personal document. Please try again."; // Handle error
          console.error('Unexpected status code:', response.status);
        }
      },
      (error: any) => {
        this.errorMessage = "Error approving personal document. Please try again."; // Set error message
        console.error('Error approving personal document:', error);
      }
    );
  }

  approveCollateralDocument(applicationId: any): void {
    if (!this.applicationId) return;

    this.loanService.approveCollateralDocumentByApplicationId(applicationId).subscribe(
      (response: any) => {
        if (true) {
          this.successMessage = "Collateral Document Approved Successfully"; // Set success message
          console.log("Personal Loan Approved");
        } else {
          this.errorMessage = "Failed to approve personal document. Please try again."; // Handle error
          console.error('Unexpected status code:', response.status);
        }
      },
      (error: any) => {
        this.errorMessage = "Error approving collateral document. Please try again."; // Set error message
        console.error('Error approving collateral document:', error);
      }
    );
  }
}
