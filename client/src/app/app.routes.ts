import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin-home',
  },
  {
    path: 'admin-home',
    loadComponent: () =>
      import('./features/home/admin-home/admin-home.component').then(
        (m) => m.AdminHomeComponent
      ),
  },
  {
    path: 'kanban',
    loadComponent: () =>
      import('./features/kanban/tasks-list/tasks-list.component').then(
        (m) => m.TasksListComponent
      ),
  },
  {
    path: 'application-options',
    loadComponent: () =>
      import('./features/settings/app-options/app-options.component').then(
        (m) => m.AppOptionsComponent
      ),
  },
  {
    path: 'users-list',
    loadComponent: () =>
      import('./features/user/users-list/users-list.component').then(
        (m) => m.UsersListComponent
      ),
  },
  {
    path: 'user-edit',
    loadComponent: () =>
      import('./features/user/user-edit/user-edit.component').then(
        (m) => m.UserEditComponent
      ),
  },
  {
    path: 'social-media',
    loadComponent: () =>
      import('./features/settings/social-media/social-media.component').then(
        (m) => m.SocialMediaComponent
      ),
  },
];
