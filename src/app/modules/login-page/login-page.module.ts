import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { AppRoutingModule } from '../../app-routing.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    FormsModule,
    RecaptchaModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class LoginPageModule { }
