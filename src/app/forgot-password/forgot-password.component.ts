import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  username: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  successMessage: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(forgotPasswordForm: any) {
    if (forgotPasswordForm.valid) {
      this.isLoading = true;

      // Construct the URL with the username appended
      const apiUrl = `http://localhost:5099/api/User/forgotPass/${this.username}`;

      this.http.put(apiUrl, {}).subscribe(
        response => {
          this.isLoading = false;
          // Display success message
          this.successMessage = 'Password changed successfully. Redirecting to login...';

          // Redirect to login page after 3 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error => {
          this.isLoading = false;
          this.errorMessage = 'Error submitting username. Please try again.';
          console.error('Error:', error);
        }
      );
    }
  }
  
}
