import {
  Component,
  inject,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../shared/services/theme.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../shared/services/auth.service';
import { UserDto } from '../../core/dtos/user/user.dto';
import { MatMenuModule } from '@angular/material/menu';
import { PhPopupComponent } from '../../shared/components/ph-popup/ph-popup.component';
import { UserEditComponent } from '../../features/pages/user/user-edit/user-edit.component';
import { UserService } from '../../features/pages/user/user.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    PhPopupComponent,
    UserEditComponent,
    MatTooltipModule,
  ],
})
export class HeaderComponent implements OnInit {
  protected user = signal<UserDto | undefined>(undefined);
  protected isUserEditPopupVisible = signal<boolean>(false);
  protected readonly avatarPlaceholder = signal<string>(
    '/assets/images/user-avatar-placeholder.jpg',
  );
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  ngOnInit() {
    this.user.set(this.authService.user());
  }

  getUser() {
    this.userService.getById(this.user()!.id).subscribe((response) => {
      this.user.set(response);
    });
  }

  onThemeSwitcherClicked() {
    if (this.themeService.theme() === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }

  onLogoutClick() {
    this.authService.logout();
  }

  onProfileClick(user: UserDto) {
    if (user) {
      this.user()!.id === user.id;
      this.isUserEditPopupVisible.set(true);
    }
  }

  onExitScreen(e: any) {
    this.isUserEditPopupVisible.set(false);
    this.getUser();
  }
}
