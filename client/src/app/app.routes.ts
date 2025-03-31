import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/account/components/register/register.component';
import { LoginComponent } from './pages/account/components/login/login.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
