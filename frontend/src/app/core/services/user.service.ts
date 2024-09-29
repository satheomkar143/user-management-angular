import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users'; // Node.js API base URL

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers() {
    return this.http.get(`${this.baseUrl}/all`);
  }

  // Create a new user
  createUser(userData: any) {
    return this.http.post(`${this.baseUrl}/create`, userData);
  }

  // Get a user by ID
  getUserById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Update user details
  updateUser(id: string, userData: any) {
    return this.http.put(`${this.baseUrl}/update/${id}`, userData);
  }

  // Delete a user by ID
  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
