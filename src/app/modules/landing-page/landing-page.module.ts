import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingComponent } from './landing/landing.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    FormsModule
  ]
})
export class LandingPageModule { }
