import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './shared/layout/side-nav/side-nav.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavComponent, FooterComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client';
  private authService = inject(AuthService);
  isAuthenticated = this.authService.isAuthenticated;

  constructor() {
    debugger;
  }
}
