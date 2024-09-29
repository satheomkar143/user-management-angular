import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; // Auth service for HTTP requests
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.loginAdmin(this.loginData).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token); // Save the JWT token
        this.router.navigate(['/dashboard']); // Redirect to dashboard after login
      },
      error: (error: any) => {
        this.errorMessage =
          error.message || 'Invalid credentials, please try again.';
      },
    });
  }
}
