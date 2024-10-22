import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing-page/landing/landing.component';
import { RegistrationComponent } from './modules/registration-page/registration/registration.component';
import { LoginComponent } from './modules/login-page/login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { LoanOfficerDashboardComponent } from './loan-officer-dashboard/loan-officer-dashboard.component';
import { UserComponent } from './modules/user-page/user/user.component';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { TrackPaymentsComponent } from './track-payments/track-payments.component';
import { LoanSchemeComponent } from './loan-scheme/loan-scheme.component';
import { ApplyLoanApplicationComponent } from './apply-loan-application/apply-loan-application.component';
import { AddSchemeComponent } from './add-scheme/add-scheme.component';
import { AddLoanOfficerComponent } from './add-loan-officer/add-loan-officer.component';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { EditLoanSchemeComponent } from './edit-loan-scheme/edit-loan-scheme.component';
import { LoanOfficersTableComponent } from './loan-officers-table/loan-officers-table.component';
import { LoanSchemesTableComponent } from './loan-schemes-table/loan-schemes-table.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoanOfficerProfileComponent } from './loan-officer-profile/loan-officer-profile.component';
import { LoanOfficerMainDashboardComponent } from './loan-officer-main-dashboard/loan-officer-main-dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ApprovedLoanComponent } from './approved-loan/approved-loan.component';
import { RejectedLoanComponent } from './rejected-loan/rejected-loan.component';
import { LoanDistributionChartComponent } from './loan-distribution-chart/loan-distribution-chart.component';
import { LoanOfficerApplicationsReportComponent } from './loan-officer-applications-report/loan-officer-applications-report.component';
import { TrackInstallmentComponent } from './track-installment/track-installment.component';
import { PayInstallmentComponent } from './pay-installment/pay-installment.component';
import { PayEmiComponent } from './pay-emi/pay-emi.component';
import { PrepayComponent } from './prepay/prepay.component';
// import { ApplyLoanComponent } from './components/apply-loan-application/apply-loan-application.component';

const routes: Routes = [ 
  { path: '', component: LandingComponent },
  {
    path: 'user',
    loadChildren: () => import('./modules/user-page/user.module').then(m => m.UserModule)
  },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'register',
    loadChildren: () => import('./modules/registration-page/registration-page.module').then(k => k.RegistrationPageModule)
  },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'loan-officer-dashboard', component: LoanOfficerDashboardComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'applications', component: ApplicationListComponent },
  { path: 'make-payment/:applicationId', component: MakePaymentComponent },

  { path: 'track-payment', component: TrackPaymentsComponent },
  { path: 'loan-scheme', component: LoanSchemeComponent },
  
  // { path: 'apply-loan', component: ApplyLoanComponent }
  {path: 'apply-loan', component: ApplyLoanApplicationComponent},

  // {
  //   path: 'add-scheme',
  //   loadChildren: () => import('./modules/admin/admin-routing.module').then(k => k.AdminRoutingModule)
  // },
  {path: 'add-scheme', component: AddSchemeComponent},

  {path: 'add-loan-officer', component: AddLoanOfficerComponent},

  { path: 'loan-officer-dashboard', component: LoanOfficerDashboardComponent, canActivate: [AuthGuard] },

  { path: 'view-documents/:applicationId', component: ViewDocumentsComponent }, // Replace 'id' with the actual document ID parameter in your actual application
  
  { path: 'edit-loan-scheme/:loanSchemesId', component: EditLoanSchemeComponent }, // Replace 'id' with the actual document ID parameter in your actual application
  { path: 'loan-officers-table', component: LoanOfficersTableComponent }, // Replace 'id' with the actual document ID parameter in your actual application
  {path:'loan-schemes-table',component:LoanSchemesTableComponent},
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'loan-officer-profile', component: LoanOfficerProfileComponent },
  { path: 'loan-officer-main-dashboard', component: LoanOfficerMainDashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'approved-loan', component: ApprovedLoanComponent },
  { path: 'rejected-loan', component: RejectedLoanComponent },
  {path: 'loan-distribution-chart', component: LoanDistributionChartComponent},
  {path: 'loan-officer-application-report', component: LoanOfficerApplicationsReportComponent},
  {path: 'pay-installment', component: PayInstallmentComponent},
  { path: 'track-installment/:applicationId', component: TrackInstallmentComponent },
  { path: 'pay-emi/:id', component: PayEmiComponent },
  { path: 'prepay/:id', component: PrepayComponent }









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
