import { Component, computed, OnInit, signal } from '@angular/core';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PhHamburgerButtonComponent } from '../../components/ph-hamburger-button/ph-hamburger-button.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HeaderComponent } from '../header/header.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../../../core/interfaces/menu-item';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
  animations: [
    trigger('smoothExpandCollapse', [
      state('expanded', style({ transform: 'translateX(0)', width: '16rem' })),
      state(
        'collapsed',
        style({ transform: 'translateX(-10%)', width: '4rem' })
      ),
      transition('expanded <=> collapsed', [animate('300ms ease-in-out')]),
    ]),
    trigger('sidenavAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1s ease-in-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('expandSubMenu', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('300ms ease-in-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ opacity: 0, height: '0px' })),
      ]),
    ]),
  ],
})
export class SideNavComponent implements OnInit {
  mode: MatDrawerMode = 'side';

  menuItems = signal<MenuItem[]>([]);
  subMenuStates = signal<Record<string, boolean>>({});
  isSideNavCollapsed = signal<boolean>(false);
  sidenavAnimationState = signal<string>('expanded');

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    // this.breakpointObserver
    //   .observe([Breakpoints.Handset])
    //   .subscribe((result) => {
    //     this.mode = result.matches ? 'over' : 'side';
    //   });
  }

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
            label: 'Application Settings',
            route: 'application-settings',
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
    this.sidenavAnimationState.set(
      this.isSideNavCollapsed() ? 'collapsed' : 'expanded'
    );
  }
}
