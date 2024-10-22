import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  user: User | null = null; // User data

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Get userId from localStorage
    this.userId = localStorage.getItem('id');
    if (this.userId) {
      this.getUserDetails(this.userId);
    }
  }

  // Fetch user details from the API
  getUserDetails(userId: string): void {
    const apiUrl = `http://localhost:5099/api/User/${userId}`; // Replace with actual API
    this.http.get<User>(apiUrl).subscribe(
      (userData) => {
        this.user = userData; // Assign fetched data to user
      },
      (error) => {
        console.error('Error fetching user data', error); // Handle error
      }
    );
  }

  // Update user details via PUT request
  updateUserDetails(): void {
    if (this.user && this.userId) {
      const apiUrl = `http://localhost:5099/api/User/${this.userId}`;
      this.http.put(apiUrl, this.user).subscribe(
        (response) => {
          console.log('User updated successfully', response); // Handle success
        },
        (error) => {
          console.error('Error updating user', error); // Handle error
        }
      );
    }
  }
}

export interface User {
  id: string;
  fullName: string;
  age: number;
  userEmail: string;
  userName: string;
  password: string;
}
