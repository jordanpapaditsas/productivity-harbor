import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../shared/services/theme.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../shared/services/auth.service';
import { UserDto } from '../../core/dtos/user/user.dto';
import { MatMenuModule } from '@angular/material/menu';
import { PhPopupComponent } from '../../shared/components/ph-popup/ph-popup.component';
import { UserEditComponent } from '../../features/user/user-edit/user-edit.component';
import { UserService } from '../../features/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    PhPopupComponent,
    UserEditComponent,
  ],
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
  protected user = signal<UserDto | undefined>(undefined);
  protected isUserEditPopupVisible = signal<boolean>(false);

  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  constructor() {
    this.themeService.getCurrentTheme();
  }

  ngOnInit() {
    debugger;
    this.theme.set(this.themeService.getCurrentTheme());
    this.user.set(this.authService.user());
  }

  getUser() {
    this.userService.getUserById(this.user()!.Id).subscribe((response) => {
      this.user.set(response);
    });
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

  onLogoutClick() {
    this.authService.logout();
  }

  onProfileClick(user: UserDto) {
    if (user) {
      this.user()!.Id === user.Id;
      this.isUserEditPopupVisible.set(true);
    }
  }

  onExitScreen(e: any) {
    this.isUserEditPopupVisible.set(false);
    this.getUser();
  }
}
