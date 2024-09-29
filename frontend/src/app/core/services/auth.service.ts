import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/admin'; // Node.js backend URL

  constructor(private http: HttpClient) {}

  // Admin login method
  loginAdmin(loginData: any) {
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  // Method to check if admin is logged in
  isLoggedIn() {
    return !!localStorage.getItem('token'); // Check if the token is present
  }

  // Method to log out the admin
  logout() {
    localStorage.removeItem('token'); // Remove token on logout
  }
}
