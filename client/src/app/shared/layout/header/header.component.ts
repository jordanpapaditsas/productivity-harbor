import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../services/theme.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { UserDto } from '../../../core/dto/user/user.dto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MatToolbarModule, MatIconModule],
  animations: [
    trigger('switchTheme', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('600ms ease-in-out', style({ opacity: 1, height: '*' })),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  protected theme = signal<string>('');
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  protected user = signal<UserDto | undefined>(undefined);

  constructor() {
    this.themeService.getWindowContentLoaded();
  }

  ngOnInit() {
    debugger;
    this.theme.set(this.themeService.getCurrentTheme());
    this.user.set(this.authService.user());
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
