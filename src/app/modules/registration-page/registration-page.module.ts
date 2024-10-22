import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationPageRoutingModule } from './registration-page-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { AppRoutingModule } from '../../app-routing.module';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RegistrationPageRoutingModule,
    FormsModule,
    RecaptchaModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class RegistrationPageModule { }
