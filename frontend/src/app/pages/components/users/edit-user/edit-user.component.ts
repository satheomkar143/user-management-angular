import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  user = {
    name: '',
    email: '',
  };
  id: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.userService.getUserById(this.id).subscribe((data: any) => {
      this.user = data;
    });
  }

  onSubmit() {
    this.userService.updateUser(this.id, this.user).subscribe(() => {
      this.router.navigate(['/users']); // Redirect to the list of users after update
    });
  }
}
