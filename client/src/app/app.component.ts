import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SideNavComponent } from './shared/layout/side-nav/side-nav.component';
import { FooterComponent } from './shared/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client';
  router = inject(Router);
}
