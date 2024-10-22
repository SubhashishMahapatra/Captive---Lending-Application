import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface TokenPayload {
  sub: string;
  id: number;
  role: string;
  // Add other properties if necessary
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5099/api'; // Your API base URL
  private token: string | null = null;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  private timeoutDuration = 10 * 60 * 1000; // 10 minutes in milliseconds
  private timeout: any; // To store the timeout reference

  constructor(private http: HttpClient, private router: Router) {}

  get isLoggedIn() {
      return this.isLoggedInSubject.asObservable();
  }

  login(username: string, password: string, recaptchaResponse: string) {
      return this.http.post(`${this.apiUrl}/Login`, {
          username,
          password,
          recaptcha: recaptchaResponse,
      });
  }

  registerUser(fullName: string, age: string, userName: string, password: string, userEmail: string): Observable<any> {
    const user = { fullName, age, userName, password, userEmail };

    // Log the user data for debugging
    console.log('Registering user:', user);
   
    return this.http.post(`${this.apiUrl}/User`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  setToken(token: string) {
      this.token = token;
      localStorage.setItem('jwtToken', token);
      this.isLoggedInSubject.next(true);
  }

  // logout() {
  //     this.token = null;
  //     localStorage.removeItem('jwtToken');
  //     this.isLoggedInSubject.next(false);
  //     this.router.navigate(['/login']);
  // }

  //timer session  
    // Call this when the user logs in
    startSessionTimer() {
      this.resetTimeout();
    }
 
    // Reset the timer whenever user performs an action
    resetTimeout() {
      // Clear any existing timeout
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
 
      // Set a new timeout for 10 minutes
      this.timeout = setTimeout(() => {
        this.logout();
      }, this.timeoutDuration);
    }
 
    // Logout the user and navigate to login page
    logout() {
      // Clear the timeout
      if (this.timeout) {
        
      clearTimeout(this.timeout);
      }
      // Perform the logout logic here
      console.log('Session expired, logging out.');
      this.token = null;
      localStorage.removeItem('jwtToken');
      this.isLoggedInSubject.next(false);
      // Redirect to login page
      this.router.navigate(['/login']);
    }

  getToken() {
      return this.token || localStorage.getItem('jwtToken');
  }

  decodeToken(token: string): TokenPayload | null {
      try {
          const payload = token.split('.')[1]; // Get the payload part of the JWT
          return JSON.parse(atob(payload)); // Decode the payload and parse it
      } catch (error) {
          console.error('Token decode error:', error);
          return null; // Return null if decoding fails
      }
  }

  getCurrentOfficerId(): number | null {
    const token = this.getToken();
    if (token) {
      const payload = this.decodeToken(token);
      return payload ? payload.id : null; // Return the officer ID
    }
    return null;
  }

}
