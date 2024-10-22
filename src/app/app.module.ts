import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPageModule } from './modules/landing-page/landing-page.module';
import { LoginPageModule } from './modules/login-page/login-page.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpRequest } from '@angular/common/http';
import { RecaptchaComponent, RecaptchaModule } from 'ng-recaptcha';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoanOfficerDashboardComponent } from './loan-officer-dashboard/loan-officer-dashboard.component';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { TrackPaymentsComponent } from './track-payments/track-payments.component';
import { LoanSchemeComponent } from './loan-scheme/loan-scheme.component';
import { ApplyLoanApplicationComponent } from './apply-loan-application/apply-loan-application.component';
import { AddSchemeComponent } from './add-scheme/add-scheme.component';
import { AddLoanOfficerComponent } from './add-loan-officer/add-loan-officer.component';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { EditLoanSchemeComponent } from './edit-loan-scheme/edit-loan-scheme.component';
import { LoanDistributionChartComponent } from './loan-distribution-chart/loan-distribution-chart.component';
import{NgChartjsModule} from'ng-chartjs';
import { LoanOfficersTableComponent } from './loan-officers-table/loan-officers-table.component';
import { LoanSchemesTableComponent } from './loan-schemes-table/loan-schemes-table.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoanOfficerProfileComponent } from './loan-officer-profile/loan-officer-profile.component';
import { LoanOfficerMainDashboardComponent } from './loan-officer-main-dashboard/loan-officer-main-dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ApprovedLoanComponent } from './approved-loan/approved-loan.component';
import { RejectedLoanComponent } from './rejected-loan/rejected-loan.component';
import { LoanOfficerApplicationsReportComponent } from './loan-officer-applications-report/loan-officer-applications-report.component';
import { PayInstallmentComponent } from './pay-installment/pay-installment.component';
import { TrackInstallmentComponent } from './track-installment/track-installment.component';
import { PayEmiComponent } from './pay-emi/pay-emi.component';
import { PrepayComponent } from './prepay/prepay.component';
 

export function tokenGetter() {
  return localStorage.getItem('jwtToken');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    LoanOfficerDashboardComponent,
    ApplicationListComponent,
    MakePaymentComponent,
    TrackPaymentsComponent,
    LoanSchemeComponent,
    ApplyLoanApplicationComponent,
    AddSchemeComponent,
    AddLoanOfficerComponent,
    ViewDocumentsComponent,
    // EditLoanSchemeComponent
    EditLoanSchemeComponent,
    LoanDistributionChartComponent,
    LoanOfficersTableComponent,
    LoanSchemesTableComponent,
    UserProfileComponent,
    LoanOfficerProfileComponent,
    LoanOfficerMainDashboardComponent,
    ForgotPasswordComponent,
    ApprovedLoanComponent,
    RejectedLoanComponent,
    LoanOfficerApplicationsReportComponent,
    PayInstallmentComponent,
    TrackInstallmentComponent,
    PayEmiComponent,
    PrepayComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    LandingPageModule,
    LoginPageModule,
    RouterModule,
    HttpClientModule,
    RecaptchaModule,
    ReactiveFormsModule,
    NgChartjsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5099'], // Replace with your API domain
        disallowedRoutes: []
      }
    })

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

