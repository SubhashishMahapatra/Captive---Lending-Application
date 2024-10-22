import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root' // Make sure AuthGuard is available throughout the application
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getToken()) {
      return true; // User is authenticated
    }
    this.router.navigate(['/login']);
    return false; // Redirect to login if not authenticated
  }
}
