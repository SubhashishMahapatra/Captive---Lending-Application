import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  recaptchaResponse: string = '';
  isLoading: boolean = false; // To manage loading state
  errorMessage: string = ''; // To store error messages
  showPassword:boolean=false;

  constructor(private authService: AuthService, private router: Router) {}

  onRecaptchaResolved(captchaResponse: string | null) {
      this.recaptchaResponse = captchaResponse || '';
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.recaptchaResponse) {
        this.authService.login(this.username, this.password, this.recaptchaResponse)
            .subscribe((response: any) => {
                this.authService.setToken(response.token);
                
                const tokenPayload = this.authService.decodeToken(response.token);

                if (tokenPayload) {
                    // Extract the id from the token payload
                    const userId = tokenPayload.id;
                    const name = tokenPayload.sub;

                    // Store the id in localStorage
                    localStorage.setItem('id', userId.toString());
                    localStorage.setItem('name', name.toString())

                    console.log("UserId:", userId);

                    // Navigate based on the user's role
                    if (tokenPayload.role === 'admin') {
                        this.router.navigate(['/admin-dashboard']);
                    } else if (tokenPayload.role === 'loanOfficer') {
                        this.router.navigate(['/loan-officer-main-dashboard']);
                    } else {
                        this.router.navigate(['/user']);
                        console.log('Navigating to role:', tokenPayload.role);
                    }
                } else {
                    console.error('Invalid token payload');
                }
            }, (error) => {
                this.isLoading = false; // Reset loading state
                console.error('Login failed', error);
                this.errorMessage = 'Login failed. Please check your credentials and try again.';
              });
    }
}

togglePasswordVisibility(){
    this.showPassword=!this.showPassword;
}

}
