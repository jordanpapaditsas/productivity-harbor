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
];
