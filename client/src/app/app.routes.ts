import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'admin-home',
    loadComponent: () =>
      import('./features/home/admin-home/admin-home.component').then(
        (m) => m.AdminHomeComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'kanban',
    loadComponent: () =>
      import('./features/kanban/tasks-list/tasks-list.component').then(
        (m) => m.TasksListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'application-options',
    loadComponent: () =>
      import('./features/settings/app-options/app-options.component').then(
        (m) => m.AppOptionsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'users-list',
    loadComponent: () =>
      import('./features/user/users-list/users-list.component').then(
        (m) => m.UsersListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-edit',
    loadComponent: () =>
      import('./features/user/user-edit/user-edit.component').then(
        (m) => m.UserEditComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-edit:id',
    loadComponent: () =>
      import('./features/user/user-edit/user-edit.component').then(
        (m) => m.UserEditComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'social-media',
    loadComponent: () =>
      import('./features/settings/social-media/social-media.component').then(
        (m) => m.SocialMediaComponent
      ),
    canActivate: [AuthGuard],
  },
];
