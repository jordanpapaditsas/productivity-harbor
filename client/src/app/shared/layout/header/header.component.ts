import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MatToolbarModule, MatIconModule],
})
export class HeaderComponent implements OnInit {
  theme = signal<string>('');
  themeService = inject(ThemeService);

  constructor() {
    this.themeService.getWindowContentLoaded();
  }

  ngOnInit() {
    this.theme.set(this.themeService.getCurrentTheme());
  }

  onThemeSwitcherClicked() {
    if (this.theme() === 'light') {
      this.themeService.setTheme('dark');
      this.theme.set('dark');
    } else if (this.theme() === 'dark') {
      this.themeService.setTheme('light');
      this.theme.set('light');
    }
  }
}
