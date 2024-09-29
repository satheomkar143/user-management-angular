import { Component } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  user = {
    name: '',
    email: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.createUser(this.user).subscribe(() => {
      this.router.navigate(['/users']); // Redirect to the list of users after creation
    });
  }
}
