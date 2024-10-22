import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-loan-officer-main-dashboard',
  templateUrl: './loan-officer-main-dashboard.component.html',
  styleUrl: './loan-officer-main-dashboard.component.css'
})
export class LoanOfficerMainDashboardComponent {

  constructor( private authService:AuthService,
    private router:Router
  ){}

  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  @HostListener('document:click')
  resetSessionTimer() {
    this.authService.resetTimeout();
  }

  officerName = localStorage.getItem('name')
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
