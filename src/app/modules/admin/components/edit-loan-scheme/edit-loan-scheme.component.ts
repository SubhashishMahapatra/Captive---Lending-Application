// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-edit-loan-scheme',
//   templateUrl: './edit-loan-scheme.component.html',
//   styleUrls: ['./edit-loan-scheme.component.css']
// })
// export class EditLoanSchemeComponent implements OnInit {
//   loanScheme: any = {}; // This will hold the loan scheme data
//   loanSchemesId: any;

//   constructor(
//     private http: HttpClient,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // Get the loanSchemesId from the route
//     this.loanSchemesId = this.route.snapshot.paramMap.get('loanSchemesId');
//     console.log("LoanScheme Id: ",this.loanSchemesId);
    
    
//     if (this.loanSchemesId) {
//       // Fetch the loan scheme details if loanSchemesId is available
//       this.getLoanSchemeDetails(this.loanSchemesId);
//     }
//   }

//   // Fetch the loan scheme details from the API
//   getLoanSchemeDetails(id: any): void {
//     this.http.get(`http://localhost:5099/GetloanSchemeById?id=${id}`).subscribe({
//       next: (loanScheme: any) => {
//         // Populate the loanScheme object with the retrieved data
//         this.loanScheme = loanScheme;
//       },
//       error: (error) => {
//         console.error('Error fetching loan scheme details:', error);
//       }
//     });
//   }

//   // Handle form submission and send PUT request to update loan scheme
//   onSubmit(): void {
//     if (this.loanScheme) {
//       this.http.put(`http://localhost:5099/api/LoanScheme/${this.loanSchemesId}`, this.loanScheme).subscribe({
//         next: () => {
//           // Navigate back to the loan schemes list or show a success message
//           this.router.navigate(['/loan-schemes']);
//         },
//         error: (error) => {
//           console.error('Error updating loan scheme:', error);
//         }
//       });
//     }
//   }
// }