import { Component, OnInit, signal } from '@angular/core';
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
import { animate, style, transition, trigger } from '@angular/animations';

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
  ],
  animations: [
    trigger('expandSubMenu', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('200ms ease-in-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({ opacity: 0, height: '0px' })),
      ]),
    ]),
  ],
})
export class SideNavComponent implements OnInit {
  mode: MatDrawerMode = 'side';

  menuItems = signal<MenuItem[]>([]);
  isSubMenuOpen = signal<boolean>(false);
  isSideNavCollapsed = signal<boolean>(false);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.mode = result.matches ? 'over' : 'side';
      });
  }

  ngOnInit() {
    this.initializeMenuItems();
  }

  initializeMenuItems() {
    this.menuItems.set([
      {
        icon: 'group_work',
        label: 'Menu',
        subItems: [
          {
            icon: 'home',
            label: 'Home',
            route: 'admin-home',
          },
          {
            icon: 'event_note',
            label: 'Kanban',
            route: 'kanban',
          },
        ],
      },
    ]);
  }

  onMenuItemClick(item: MenuItem) {
    if (!item.subItems || item.subItems?.length <= 0) {
      return;
    } else {
      this.isSubMenuOpen.set(!this.isSubMenuOpen());
    }
  }

  onSubMenuItemClick(item: MenuItem) {
    if (item) {
      this.router.navigate([item.route]);
    }
  }

  onHamburgerMenuBtnClick() {
    this.isSideNavCollapsed.set(!this.isSideNavCollapsed());
  }
}
