import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'] // Fix styleUrl to styleUrls
})
export class RegistrationComponent {
  formData = {
    name: '',
    email: '',
    age: '',
    password: '',
    username: ''
  };

  recaptchaResponse: string = '';
  successMessage: string | null = null; 
  showPassword:boolean = false;


  constructor(private authService: AuthService, private router: Router) {} 

 
  onRecaptchaResolved(captchaResponse: string | null) {
    this.recaptchaResponse = captchaResponse || '';
  }

  onSubmit(form: any): void {
    if (form.valid && this.recaptchaResponse) {
      const requestData = {
        fullName: this.formData.name,       
        age: this.formData.age,             
        userName: this.formData.username,   
        password: this.formData.password,   
        userEmail: this.formData.email,     
        recaptcha: this.recaptchaResponse    
      };

      this.authService.registerUser(
        requestData.fullName,
        requestData.age,
        requestData.userName,
        requestData.password,
        requestData.userEmail
      ).subscribe(
        (response: any) => {
          console.log('Registration successful:', response);
          this.successMessage = 'Registration successful!'; 
          setTimeout(() => {
            this.router.navigate(['/login']); 
          }, 2000);
        },
        (error: any) => {
          console.error('Registration failed:', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['']); 
  }
  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
}
}
