import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  createUser() {
    this.router.navigate(['/create-user']);
  }

  editUser(id: string) {
    this.router.navigate([`/edit-user/${id}`]);
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers(); // Reload users after deletion
    });
  }
}
