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
      import('./features/pages/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'admin-home',
    loadComponent: () =>
      import('./features/pages/home/admin-home/admin-home.component').then(
        (m) => m.AdminHomeComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'kanban',
    loadComponent: () =>
      import('./features/pages/kanban/tasks-list/tasks-list.component').then(
        (m) => m.TasksListComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'application-options',
    loadComponent: () =>
      import('./features/pages/settings/app-options/app-options.component').then(
        (m) => m.AppOptionsComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'users-list',
    loadComponent: () =>
      import('./features/pages/user/users-list/users-list.component').then(
        (m) => m.UsersListComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-edit/:id',
    loadComponent: () =>
      import('./features/pages/user/user-edit/user-edit.component').then(
        (m) => m.UserEditComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'social-media',
    loadComponent: () =>
      import('./features/pages/settings/social-media/social-media.component').then(
        (m) => m.SocialMediaComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-permissions',
    loadComponent: () =>
      import('./features/pages/settings/user-permissions/user-permissions.component').then(
        (m) => m.UserPermissionsComponent,
      ),
    canActivate: [AuthGuard],
  },
];
