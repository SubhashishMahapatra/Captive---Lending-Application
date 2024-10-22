import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
// import { AddLoanOfficerComponent } from './components/add-loan-officer/add-loan-officer.component';
import { LoanOfficerListComponent } from './components/loan-officer-list/loan-officer-list.component';
import { LoanSchemeListComponent } from './components/loan-scheme-list/loan-scheme-list.component';
import { EditLoanOfficerComponent } from './components/edit-loan-officer/edit-loan-officer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    // AddLoanOfficerComponent,
    LoanOfficerListComponent,
    LoanSchemeListComponent,
    EditLoanOfficerComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
