import { Routes } from '@angular/router';
import { LoginComponent } from './pages/components/login/login.component';
import { ListUsersComponent } from './pages/components/users/list-users/list-users.component';
import { EditUserComponent } from './pages/components/users/edit-user/edit-user.component';
import { CreateUserComponent } from './pages/components/users/create-user/create-user.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'users',
    // canActivate: [authGuard],
    children: [
      {
        path: '',
        component: ListUsersComponent,
      },
      { path: 'create', component: CreateUserComponent },
      { path: 'edit/:id', component: EditUserComponent },
    ],
  },
];
