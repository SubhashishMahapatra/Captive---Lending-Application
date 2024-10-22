import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  isSidebarCollapsed = true;
 
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  constructor(private authService:AuthService,private router : Router){}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  @HostListener('document:click')
  resetSessionTimer() {
    this.authService.resetTimeout();
  }


  userName = localStorage.getItem('name')

  
}
