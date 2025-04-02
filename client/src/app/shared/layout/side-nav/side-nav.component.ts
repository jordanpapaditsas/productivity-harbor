import { Component, OnInit } from '@angular/core';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PhHamburgerButtonComponent } from '../../components/ph-hamburger-button/ph-hamburger-button.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  imports: [
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    PhHamburgerButtonComponent,
  ],
})
export class SideNavComponent implements OnInit {
  mode: MatDrawerMode = 'side';

  ngOnInit() {}

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.mode = result.matches ? 'over' : 'side';
      });
  }
}
