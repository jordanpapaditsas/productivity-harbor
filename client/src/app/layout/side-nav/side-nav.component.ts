import { Component, OnInit, signal } from '@angular/core';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PhHamburgerButtonComponent } from '../../shared/components/ph-hamburger-button/ph-hamburger-button.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HeaderComponent } from '../header/header.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../../core/interfaces/menu-item';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  imports: [
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    PhHamburgerButtonComponent,
    HeaderComponent,
    MatTreeModule,
    MatIconModule,
    RouterLink,
    RouterModule,
    MatTooltipModule,
    CommonModule,
  ],
})
export class SideNavComponent implements OnInit {
  mode: MatDrawerMode = 'side';

  menuItems = signal<MenuItem[]>([]);
  subMenuStates = signal<Record<string, boolean>>({});
  isSideNavCollapsed = signal<boolean>(false);

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeMenuItems();
  }

  initializeMenuItems() {
    this.menuItems.set([
      {
        icon: 'home',
        label: 'Home',
        route: 'admin-home',
      },
      {
        icon: 'group_work',
        label: 'Menu',
        subItems: [
          {
            icon: 'event_note',
            label: 'Kanban',
            route: 'kanban',
          },
        ],
      },
      {
        icon: 'settings',
        label: 'Settings',
        subItems: [
          {
            icon: 'settings_applications',
            label: 'Application Options',
            route: 'application-options',
          },
          {
            icon: 'people',
            label: 'Users',
            route: 'users-list',
          },
          {
            icon: 'supervised_user_circle',
            label: 'Social Media',
            route: 'social-media',
          },
        ],
      },
    ]);
  }

  onMenuItemClick(item: MenuItem) {
    if (!item.subItems || item.subItems?.length <= 0) {
      return;
    }

    this.subMenuStates.update((states) => ({
      ...states,
      [item.label]: !states[item.label],
    }));
  }

  isSubMenuOpen(itemLabel: string): boolean {
    return this.subMenuStates()[itemLabel]
      ? this.subMenuStates()[itemLabel]
      : false;
  }

  onSubMenuItemClick(item: MenuItem) {
    if (item) {
      this.router.navigate([item.route]);
    }
  }

  onSideNavToggle() {
    this.isSideNavCollapsed.set(!this.isSideNavCollapsed());
  }
}
