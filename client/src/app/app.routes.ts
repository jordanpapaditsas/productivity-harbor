import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
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
    path: 'application-settings',
    loadComponent: () =>
      import('./features/settings/app-settings/app-settings.component').then(
        (m) => m.AppSettingsComponent
      ),
  },
  {
    path: 'users-list',
    loadComponent: () =>
      import('./features/user/users-list/users-list.component').then(
        (m) => m.UsersListComponent
      ),
  },
];
